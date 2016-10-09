import * as binders from "./../binders";
import {TsSourceFile, TsNode, TsTypeNode, TsSignature, TsType, TsSymbol, TsExpression} from "./../compiler";
import * as definitions from "./../definitions";
import {KeyValueCache, Logger} from "./../utils";

function bindToDefinition<DefType>(binder: { bind(def: DefType): void; }, def: DefType) {
    binder.bind(def);
    return def;
}

export class TsFactory {
    private readonly definitionByNode = new KeyValueCache<TsNode, definitions.NodeDefinitions>();
    private readonly files = new KeyValueCache<TsSourceFile, definitions.FileDefinition>();
    private readonly deferredBindings: { binder: binders.IBaseBinder; definition: definitions.BaseDefinition; }[] = [];
    private readonly createdTypesWithDefinition: { type: TsType; definition: definitions.BaseTypeDefinition; }[] = [];

    constructor(private readonly settings: { includeCompilerNodes: boolean; }) {
    }

    getShouldIncludeCompilerNodes() {
        return this.settings.includeCompilerNodes;
    }

    getCallSignatureFromNode(node: TsNode) {
        return bindToDefinition(new binders.TsCallSignatureBinderByNode(this, node), new definitions.CallSignatureDefinition());
    }

    getCallSignatureFromSignature(signature: TsSignature) {
        return bindToDefinition(new binders.TsCallSignatureBinderBySignature(this, signature), new definitions.CallSignatureDefinition());
    }

    getClassConstructor(node: TsNode) {
        return bindToDefinition(new binders.TsClassConstructorBinder(this, node), new definitions.ClassConstructorDefinition());
    }

    getClassMethod(nodes: TsNode[]) {
        return bindToDefinition(new binders.TsClassMethodBinder(this, nodes), new definitions.ClassMethodDefinition());
    }

    getClassStaticMethod(nodes: TsNode[]) {
        return bindToDefinition(new binders.TsClassStaticMethodBinder(this, nodes), new definitions.ClassStaticMethodDefinition());
    }

    getClassProperty(nodes: TsNode[]) {
        return bindToDefinition(new binders.TsClassPropertyBinder(this, nodes), new definitions.ClassPropertyDefinition());
    }

    getClassStaticProperty(node: TsNode) {
        return bindToDefinition(new binders.TsClassStaticPropertyBinder(this, node), new definitions.ClassStaticPropertyDefinition());
    }

    getDecorator(node: TsNode) {
        return bindToDefinition(new binders.TsDecoratorBinder(this, node), new definitions.DecoratorDefinition());
    }

    getEnumMember(node: TsNode) {
        return bindToDefinition(new binders.TsEnumMemberBinder(this, node), new definitions.EnumMemberDefinition());
    }

    getExpression(tsExpression: TsExpression) {
        return bindToDefinition(new binders.TsExpressionBinder(tsExpression), new definitions.ExpressionDefinition());
    }

    getIndexSignatureFromNode(node: TsNode) {
        return this.getIndexSignatureFromSignature(node.getSignatureFromThis());
    }

    getIndexSignatureFromSignature(signature: TsSignature) {
        return bindToDefinition(new binders.TsIndexSignatureBinder(this, signature), new definitions.IndexSignatureDefinition());
    }

    getInterfaceMethod(nodes: TsNode[]) {
        return bindToDefinition(new binders.TsInterfaceMethodBinder(this, nodes), new definitions.InterfaceMethodDefinition());
    }

    getInterfaceProperty(node: TsNode) {
        return bindToDefinition(new binders.TsInterfacePropertyBinder(this, node), new definitions.InterfacePropertyDefinition());
    }

    getObjectProperty(node: TsNode) {
        return bindToDefinition(new binders.TsObjectPropertyBinder(this, node), new definitions.ObjectPropertyDefinition());
    }

    getNamedImportPart(node: TsNode) {
        return bindToDefinition(new binders.TsNamedImportPartBinder(this, node), new definitions.NamedImportPartDefinition());
    }

    getDefaultImportPart(obj: { name: string; definitions: definitions.ExportableDefinitions[]; expression: definitions.ExpressionDefinition; }) {
        const def = new definitions.DefaultImportPartDefinition();
        def.name = obj.name;
        def.definitions.push(...obj.definitions);
        def.expression = obj.expression;
        return def;
    }

    getStarImportPart(obj: { name: string; definitions: definitions.ExportableDefinitions[]; expression: definitions.ExpressionDefinition | null; }) {
        const def = new definitions.StarImportPartDefinition();
        def.name = obj.name;
        def.definitions.push(...obj.definitions);
        def.expression = obj.expression;
        return def;
    }

    getTypeParameter(node: TsNode) {
        return bindToDefinition(new binders.TsTypeParameterBinder(this, node), new definitions.TypeParameterDefinition());
    }

    getTypePropertyFromSymbol(symbol: TsSymbol) {
        return this.getTypePropertyFromNode(symbol.getOnlyNode());
    }

    getTypePropertyFromNode(node: TsNode) {
        return bindToDefinition(new binders.TsTypePropertyBinder(this, node), new definitions.TypePropertyDefinition());
    }

    getTypeNode(node: TsTypeNode) {
        const definition = bindToDefinition(new binders.TsTypeNodeBinder(this, node), new definitions.TypeNodeDefinition());
        this.createdTypesWithDefinition.push({
            type: node.getType(),
            definition
        });
        return definition;
    }

    getTypeFromTypeNode(node: TsTypeNode) {
        const definition = bindToDefinition(new binders.TsTypeBinder(this, node.getType(), node), new definitions.TypeDefinition());
        this.createdTypesWithDefinition.push({
            type: node.getType(),
            definition
        });
        return definition;
    }

    getType(type: TsType, node: TsTypeNode | null) {
        const definition = bindToDefinition(new binders.TsTypeBinder(this, type, node), new definitions.TypeDefinition());
        this.createdTypesWithDefinition.push({
            type,
            definition
        });
        return definition;
    }

    getUserDefinedTypeGuardFromNode(node: TsNode) {
        return bindToDefinition(new binders.TsUserDefinedTypeGuardBinder(this, node), new definitions.UserDefinedTypeGuardDefinition());
    }

    getAllExportableDefinitionsBySymbol(symbol: TsSymbol) {
        symbol = symbol.isAlias() ? symbol.getAliasSymbol()! : symbol;
        const defs = this.getAllDefinitionsBySymbol(symbol);
        const exportableDefinitions: definitions.ExportableDefinitions[] = [];

        function handleDefinition(definition: (definitions.ExportableDefinitions | definitions.ReExportDefinition)) {
            if (definition instanceof definitions.ReExportDefinition) {
                handleReExport(definition);
            }
            else {
                exportableDefinitions.push(definition);
            }
        }

        function handleReExport(reExportDefinition: definitions.ReExportDefinition) {
            reExportDefinition.getExports().forEach(handleDefinition);
        }

        defs.forEach(handleDefinition);

        return exportableDefinitions;
    }

    getAllDefinitionsBySymbol(symbol: TsSymbol) {
        const definitions: (definitions.NodeDefinitions | null)[] = [];
        const functionNodes: TsNode[] = [];

        symbol.getNodes().map(node => {
            if (node.isTypeLiteral()) {
                const parentNode = node.getParent();
                if (parentNode != null && parentNode.isTypeAlias())
                    node = parentNode;
            }

            if (node.isFunction())
                functionNodes.push(node);
            else
                definitions.push(this.getDefinitionByNode(node));
        });

        if (functionNodes.length > 0)
            definitions.push(this.getFunctionDefinitionByNodes(functionNodes));

        return definitions.filter(d => d != null);
    }

    getDefinitionByNode(node: TsNode) {
        return this.definitionByNode.get(node) || this.createDefinition(node);
    }

    getFunctionDefinitionByNodes(nodes: TsNode[]) {
        const def = this.definitionByNode.get(nodes[nodes.length - 1]) as definitions.FunctionDefinition | null;

        if (def != null)
            return def;

        return bindToDefinition(new binders.TsFunctionBinderByNodes(this, nodes), new definitions.FunctionDefinition());
    }

    getFileDefinition(file: TsSourceFile) {
        return this.files.getOrCreate(file, () => {
            const def = new definitions.FileDefinition();
            const binder = new binders.TsFileBinder(this, file);

            binder.bind(def);

            return def;
        });
    }

    getDefinitionsOrExpressionFromExportSymbol(symbol: TsSymbol) {
        const obj: { definitions: definitions.ExportableDefinitions[]; expression: definitions.ExpressionDefinition | null; } = { definitions: [], expression: null };

        if (symbol != null) {
            if (symbol.isAlias()) {
                symbol = symbol.getAliasSymbol()!;
            }

            const expression = this.getExpressionFromExportSymbol(symbol);

            if (expression != null) {
                obj.expression = expression;
            }
            else {
                obj.definitions.push(...this.getAllDefinitionsBySymbol(symbol) as definitions.ExportableDefinitions[]);
            }
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
        this.createdTypesWithDefinition.forEach(typeAndDef => {
            const {type, definition} = typeAndDef;
            const symbols = type.getSymbols();

            symbols.forEach(s => {
                const hasChildTypes = definition.unionTypes.length > 0 || definition.intersectionTypes.length > 0 || definition.isArrayType();

                if (!hasChildTypes) {
                    definition.definitions.push(...this.getAllDefinitionsBySymbol(s) as definitions.ModuleMemberDefinitions[]);
                }
            });
        });
    }

    bindDeferred() {
        this.deferredBindings.forEach(obj => {
            obj.binder.bind(obj.definition);
        });
    }

    private createDefinition(node: TsNode) {
        let definition: definitions.NodeDefinitions | null = null;

        // todo: all these if statements are very similar. Need to reduce the redundancy
        if (node.isClass()) {
            definition = bindToDefinition(new binders.TsClassBinder(this, node), new definitions.ClassDefinition());
        }
        else if (node.isInterface()) {
            definition = bindToDefinition(new binders.TsInterfaceBinder(this, node), new definitions.InterfaceDefinition());
        }
        else if (node.isEnum()) {
            definition = bindToDefinition(new binders.TsEnumBinder(this, node), new definitions.EnumDefinition());
        }
        else if (node.isVariable()) {
            definition = bindToDefinition(new binders.TsVariableBinder(this, node), new definitions.VariableDefinition());
        }
        else if (node.isTypeAlias()) {
            definition = bindToDefinition(new binders.TsTypeAliasBinder(this, node), new definitions.TypeAliasDefinition());
        }
        else if (node.isNamespace()) {
            definition = bindToDefinition(new binders.TsNamespaceBinder(this, node), new definitions.NamespaceDefinition());
        }
        else if (node.isFunction()) {
            Logger.error(`Don't use ${nameof(TsFactory)}.${nameof<TsFactory>(f => f.createDefinition)} to get a function.`);
        }
        else if (node.isExportDeclaration()) {
            const binder = new binders.TsReExportBinder(this, node);
            definition = new definitions.ReExportDefinition();

            this.deferredBindings.push({
                binder,
                definition
            });
        }
        else if (node.isImport()) {
            const binder = new binders.TsImportBinder(this, node);
            definition = new definitions.ImportDefinition();

            this.deferredBindings.push({
                binder,
                definition
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
