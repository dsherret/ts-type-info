import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        NodeDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition, ModuleMemberDefinitions, ExportableDefinitions, BaseDefinition,
        ExpressionDefinition, TypeDefinition, TypeExpressionDefinition} from "./../definitions";
import {KeyValueCache, Logger} from "./../utils";
import {IBaseBinder, TsFileBinder, TsFunctionBinder, TsClassBinder, TsInterfaceBinder, TsNamespaceBinder, TsEnumBinder,
    TsVariableBinder, TsTypeAliasBinder, TsImportBinder, TsReExportBinder, TsExpressionBinder, TsExpressionBinderByNode} from "./../binders";
import {TsSourceFile, TsNode, TsType, TsTypeExpression, TsSymbol, TsExpression} from "./../compiler";

// todo: Rename to DefinitionFactory
export class TsFactory {
    private definitionByNode = new KeyValueCache<TsNode, NodeDefinitions>();
    private files = new KeyValueCache<TsSourceFile, FileDefinition>();
    private typeExpressions = new KeyValueCache<TsTypeExpression, TypeExpressionDefinition>();
    private types = new KeyValueCache<TsType, TypeDefinition>();
    private deferredBindings: { binder: IBaseBinder, definition: BaseDefinition }[] = [];

    getTypeExpressionFromNode(node: TsNode) {
        const tsType = node.getTypeAtLocation();
        const def = new TypeExpressionDefinition();
        const binder = new TsExpressionBinderByNode(node);
        binder.bind(def);

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
                const def = new TypeExpressionDefinition();
                const binder = new TsExpressionBinder(tsTypeExpression);
                binder.bind(def);
                return def;
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
        const def = new ExpressionDefinition();
        const binder = new TsExpressionBinder(tsExpression);
        binder.bind(def);
        return def;
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
            const binder = new TsFunctionBinder(this, node);
            const def = new FunctionDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isClass()) {
            const binder = new TsClassBinder(this, node);
            const def = new ClassDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isInterface()) {
            const binder = new TsInterfaceBinder(this, node);
            const def = new InterfaceDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isEnum()) {
            const binder = new TsEnumBinder(node);
            const def = new EnumDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isVariable()) {
            const binder = new TsVariableBinder(this, node);
            const def = new VariableDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isTypeAlias()) {
            const binder = new TsTypeAliasBinder(this, node);
            const def = new TypeAliasDefinition();

            binder.bind(def);
            definition = def;
        }
        else if (node.isNamespace()) {
            const binder = new TsNamespaceBinder(this, node);
            const def = new NamespaceDefinition();

            binder.bind(def);
            definition = def;
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
