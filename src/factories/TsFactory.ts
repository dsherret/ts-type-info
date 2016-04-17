import {IBaseBinder, TsCallSignatureBinder, TsClassBinder, TsClassConstructorBinder, TsClassMethodBinder, TsClassStaticMethodBinder, TsClassPropertyBinder, TsClassStaticPropertyBinder,
    TsDecoratorBinder, TsEnumBinder, TsEnumMemberBinder, TsExpressionBinder, TsExpressionBinderByNode, TsImportBinder, TsInterfaceMethodBinder, TsInterfaceNewSignatureBinder,
    TsInterfacePropertyBinder, TsFileBinder, TsFunctionBinder, TsInterfaceBinder, TsNamespaceBinder, TsVariableBinder, TsTypeAliasBinder, TsReExportBinder,
    TsTypeParameterBinder} from "./../binders";
import {TsSourceFile, TsNode, TsType, TsTypeExpression, TsSymbol, TsExpression} from "./../compiler";
import {CallSignatureDefinition, ClassDefinition, ClassConstructorDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassPropertyDefinition,
    ClassStaticPropertyDefinition, DecoratorDefinition, EnumDefinition, EnumMemberDefinition, ExportableDefinitions, ExpressionDefinition, FileDefinition, FunctionDefinition,
    ImportDefinition, ImportPartDefinition, InterfaceDefinition, InterfaceMethodDefinition, InterfaceNewSignatureDefinition, InterfacePropertyDefinition, NamespaceDefinition,
    VariableDefinition, NodeDefinitions, TypeAliasDefinition, ReExportDefinition, ReExportPartDefinition, ModuleMemberDefinitions, BaseDefinition, TypeDefinition,
    TypeExpressionDefinition, TypeParameterDefinition} from "./../definitions";
import {KeyValueCache, Logger} from "./../utils";

function bindToDefinition<DefType extends BaseDefinition>(binder: { bind(def: DefType): void; }, def: DefType) {
    binder.bind(def);
    return def;
}

export class TsFactory {
    private definitionByNode = new KeyValueCache<TsNode, NodeDefinitions>();
    private files = new KeyValueCache<TsSourceFile, FileDefinition>();
    private typeExpressions = new KeyValueCache<TsTypeExpression, TypeExpressionDefinition>();
    private types = new KeyValueCache<TsType, TypeDefinition>();
    private deferredBindings: { binder: IBaseBinder, definition: BaseDefinition }[] = [];

    getCallSignature(node: TsNode) {
        return bindToDefinition(new TsCallSignatureBinder(this, node.getSignatureFromThis()), new CallSignatureDefinition());
    }

    getClassConstructor(node: TsNode) {
        return bindToDefinition(new TsClassConstructorBinder(this, node), new ClassConstructorDefinition());
    }

    getClassMethod(node: TsNode) {
        return bindToDefinition(new TsClassMethodBinder(this, node), new ClassMethodDefinition());
    }

    getClassStaticMethod(node: TsNode) {
        return bindToDefinition(new TsClassStaticMethodBinder(this, node), new ClassStaticMethodDefinition());
    }

    getClassProperty(node: TsNode) {
        return bindToDefinition(new TsClassPropertyBinder(this, node), new ClassPropertyDefinition());
    }

    getClassStaticProperty(node: TsNode) {
        return bindToDefinition(new TsClassStaticPropertyBinder(this, node), new ClassStaticPropertyDefinition());
    }

    getDecorator(node: TsNode) {
        return bindToDefinition(new TsDecoratorBinder(this, node), new DecoratorDefinition());
    }

    getEnumMember(node: TsNode) {
        return bindToDefinition(new TsEnumMemberBinder(node), new EnumMemberDefinition());
    }

    getExpression(tsExpression: TsExpression) {
        return bindToDefinition(new TsExpressionBinder(tsExpression), new ExpressionDefinition());
    }

    getImportPart(obj: { importName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }) {
        const def = new ImportPartDefinition();
        def.importName = obj.importName;
        def.definitions.push(...obj.definitions);
        def.expression = obj.expression;
        return def;
    }

    getInterfaceMethod(node: TsNode) {
        return bindToDefinition(new TsInterfaceMethodBinder(this, node), new InterfaceMethodDefinition());
    }

    getInterfaceNewSignature(node: TsNode) {
        return bindToDefinition(new TsInterfaceNewSignatureBinder(this, node.getSignatureFromThis()), new InterfaceNewSignatureDefinition());
    }

    getInterfaceProperty(node: TsNode) {
        return bindToDefinition(new TsInterfacePropertyBinder(this, node), new InterfacePropertyDefinition());
    }

    getReExportPart(obj: { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; }) {
        const def = new ReExportPartDefinition();
        def.exportName = obj.exportName;
        def.definitions.push(...obj.definitions);
        def.expression = obj.expression;
        return def;
    }

    getTypeParameter(node: TsNode) {
        return bindToDefinition(new TsTypeParameterBinder(this, node), new TypeParameterDefinition());
    }

    getTypeExpressionFromNode(node: TsNode) {
        const tsType = node.getTypeAtLocation();
        const def = bindToDefinition<TypeExpressionDefinition>(new TsExpressionBinderByNode(node), new TypeExpressionDefinition());

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
            () => bindToDefinition<TypeExpressionDefinition>(new TsExpressionBinder(tsTypeExpression), new TypeExpressionDefinition()),
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

            const expression = this.getExpressionFromExportSymbol(symbol);

            if (expression != null) {
                obj.expression = expression;
                return obj;
            }

            obj.definitions.push(...this.getAllDefinitionsBySymbol(symbol) as ExportableDefinitions[]);
        }

        return obj;
    }

    getExpressionFromExportSymbol(symbol: TsSymbol) {
        const nodes = symbol.getNodes();

        if (nodes.length === 1) {
            const tsExpression = nodes[0].getExpression();

            if (tsExpression != null) {
                return this.getExpression(tsExpression);
            }
        }

        return null;
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
            definition = bindToDefinition(new TsEnumBinder(this, node), new EnumDefinition());
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
