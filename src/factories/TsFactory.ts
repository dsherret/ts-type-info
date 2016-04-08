import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        NodeDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition, ModuleMemberDefinitions, ExportableDefinitions, BaseDefinition,
        ExpressionDefinition, TypeDefinition, TypeExpressionDefinition} from "./../definitions";
import {KeyValueCache, Logger} from "./../utils";
import {IBaseBinder, TsFileBinder, TsFunctionBinder, TsClassBinder, TsInterfaceBinder, TsNamespaceBinder, TsEnumBinder,
    TsVariableBinder, TsTypeAliasBinder, TsImportBinder, TsReExportBinder, TsExpressionBinder, TsExpressionBinderByNode} from "./../binders";
import {TsSourceFile, TsNode, TsType, TsTypeExpression, TsSymbol, TsExpression} from "./../compiler";

function bindToDefinition<DefType extends BaseDefinition>(binder: IBaseBinder, def: DefType) {
    binder.bind(def);
    return def;
}

export class TsFactory {
    private definitionByNode = new KeyValueCache<TsNode, NodeDefinitions>();
    private files = new KeyValueCache<TsSourceFile, FileDefinition>();
    private typeExpressions = new KeyValueCache<TsTypeExpression, TypeExpressionDefinition>();
    private types = new KeyValueCache<TsType, TypeDefinition>();
    private deferredBindings: { binder: IBaseBinder, definition: BaseDefinition }[] = [];

    getTypeExpressionFromNode(node: TsNode) {
        const tsType = node.getTypeAtLocation();
        const def = bindToDefinition(new TsExpressionBinderByNode(node), new TypeExpressionDefinition());

        if (tsType != null) {
            def.addType(this.getType(tsType));
        }

        return def;
    }

    getTypeExpression(tsTypeExpression: TsTypeExpression) {
        if (tsTypeExpression == null) {
            return null;
        }

        return this.typeExpressions.getOrCreate(
            tsTypeExpression,
            () => {
                return bindToDefinition(new TsExpressionBinder(tsTypeExpression), new TypeExpressionDefinition());
            },
            createdTypeExpression => {
                tsTypeExpression.getTypes().forEach(type => {
                    createdTypeExpression.addType(this.getType(type));
                });
            });
    }

    getType(type: TsType) {
        return this.types.getOrCreate(type, () => new TypeDefinition(), createdType => {
            createdType.fillTypeInformation(this, type);
        });
    }

    getAllExportableDefinitionsBySymbol(symbol: TsSymbol) {
        symbol = symbol.isAlias() ? symbol.getAliasSymbol() : symbol;
        const definitions = this.getAllDefinitionsBySymbol(symbol);
        const exportableDefinitions: ExportableDefinitions[] = [];

        function handleDefinition(definition: (ExportableDefinitions | ReExportDefinition)) {
            if (definition.isReExportDefinition()) {
                handleReExport(definition);
            }
            else {
                exportableDefinitions.push(definition);
            }
        }

        function handleReExport(reExportDefinition: ReExportDefinition) {
            reExportDefinition.getExports().forEach(handleDefinition);
        }

        definitions.forEach(handleDefinition);

        return exportableDefinitions;
    }

    getAllDefinitionsBySymbol(symbol: TsSymbol) {
        return symbol.getNodes().map(node => {
            return this.getDefinitionByNode(node);
        }).filter(d => d != null);
    }

    getDefinitionByNode(node: TsNode) {
        return this.definitionByNode.get(node) || this.createDefinition(node);
    }

    getFileDefinition(file: TsSourceFile) {
        return this.files.getOrCreate(file, () => {
            const def = new FileDefinition();
            const binder = new TsFileBinder(this, file);

            binder.bind(def);

            return def;
        });
    }

    getDefinitionsOrExpressionFromExportSymbol(symbol: TsSymbol) {
        const obj: { definitions: ExportableDefinitions[]; expression: ExpressionDefinition; } = { definitions: [], expression: null };

        if (symbol != null) {
            if (symbol.isAlias()) {
                symbol = symbol.getAliasSymbol();
            }

            const nodes = symbol.getNodes();

            if (nodes.length === 1) {
                const tsExpression = nodes[0].getExpression();

                if (tsExpression != null) {
                    const expression = this.getExpressionDefinition(tsExpression);
                    obj.expression = expression;
                    return obj;
                }
            }

            obj.definitions.push(...this.getAllDefinitionsBySymbol(symbol) as ExportableDefinitions[]);
        }

        return obj;
    }

    getExpressionDefinition(tsExpression: TsExpression) {
        return bindToDefinition(new TsExpressionBinder(tsExpression), new ExpressionDefinition());
    }

    fillAllCachedTypesWithDefinitions() {
        this.types.getAll().forEach(type => {
            const iType = this.types.getKeyFromValue(type);
            const symbols = iType.getSymbols();

            symbols.forEach(s => {
                type.addDefinitions(this.getAllDefinitionsBySymbol(s) as ModuleMemberDefinitions[]);
            });
        });
    }

    bindDeferred() {
        this.deferredBindings.forEach(obj => {
            obj.binder.bind(obj.definition);
        });
    }

    private createDefinition(node: TsNode) {
        let definition: NodeDefinitions;

        // todo: all these if statements are very similar. Need to reduce the redundancy
        if (node.isFunction()) {
            definition = bindToDefinition(new TsFunctionBinder(this, node), new FunctionDefinition());
        }
        else if (node.isClass()) {
            definition = bindToDefinition(new TsClassBinder(this, node), new ClassDefinition());
        }
        else if (node.isInterface()) {
            definition = bindToDefinition(new TsInterfaceBinder(this, node), new InterfaceDefinition());
        }
        else if (node.isEnum()) {
            definition = bindToDefinition(new TsEnumBinder(node), new EnumDefinition());
        }
        else if (node.isVariable()) {
            definition = bindToDefinition(new TsVariableBinder(this, node), new VariableDefinition());
        }
        else if (node.isTypeAlias()) {
            definition = bindToDefinition(new TsTypeAliasBinder(this, node), new TypeAliasDefinition());
        }
        else if (node.isNamespace()) {
            definition = bindToDefinition(new TsNamespaceBinder(this, node), new NamespaceDefinition());
        }
        else if (node.isExportDeclaration()) {
            const binder = new TsReExportBinder(this, node);
            definition = new ReExportDefinition();

            this.deferredBindings.push({
                binder: binder,
                definition: definition
            });
        }
        else if (node.isImport()) {
            const binder = new TsImportBinder(this, node);
            definition = new ImportDefinition();

            this.deferredBindings.push({
                binder: binder,
                definition: definition
            });
        }
        else if (node.isExportAssignment()) {
            // ignore exports here, handled in ExportableDefinition
        }
        else if (node.isTypeParameter()) {
            // ignore type parameter here, handled in TypedParameterDefinition
        }
        else if (node.isMethodSignature() || node.isFunctionType()) {
            // ignore
        }
        else {
            Logger.warn(`Unknown node kind: ${node.nodeKindToString()}`);
        }

        if (definition != null) {
            this.definitionByNode.add(node, definition);
        }

        return definition;
    }
}
