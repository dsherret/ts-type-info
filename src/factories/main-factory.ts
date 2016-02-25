import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        MainDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition} from "./../definitions";
import {Expression, Type, TypeExpression} from "./../expressions";
import {KeyValueCache, Logger, ArrayExt} from "./../utils";
import {ISourceFile, ISymbolNode, INode, IType, ITypeExpression, IImportClause} from "./../wrappers";

export class MainFactory {
    private definitionBySymbolNode = new KeyValueCache<INode, MainDefinitions>();
    private files = new KeyValueCache<ISourceFile, FileDefinition>();
    private typeExpressions = new KeyValueCache<ITypeExpression, TypeExpression>();
    private types = new KeyValueCache<IType, Type>();

    getTypeExpression(typeExpression: ITypeExpression) {
        if (typeExpression == null) {
            return null;
        }

        return this.typeExpressions.getOrCreate(typeExpression, () => new TypeExpression(typeExpression), createdTypeExpression => {
            typeExpression.getTypes().forEach(type => {
                createdTypeExpression.addType(this.getType(type));
            });
        });
    }

    getType(type: IType) {
        return this.types.getOrCreate(type, () => new Type(), createdType => {
            createdType.fillTypeInformation(this, type);
        });
    }

    getImportDefinitions(opts: { importClause: IImportClause; parent: FileDefinition; }) {
        const definitions = this.getAllDefinitionsBySymbolOfSymbolNode(opts.importClause.getSymbolNode());

        return (definitions || []).map(definition => new ImportDefinition(
            opts.importClause,
            definition,
            opts.parent
        ));
    }

    getReExportDefinitions(opts: { symbolNode: ISymbolNode; parent: FileDefinition; }) {
        const definitions = this.getAllDefinitionsBySymbolOfSymbolNode(opts.symbolNode);

        return (definitions || []).map(definition => new ReExportDefinition(
            this.getFileDefinitionFromSourceFile(opts.symbolNode.getSourceFile()),
            definition,
            opts.parent
        ));
    }

    getAllDefinitionsBySymbolOfSymbolNode(symbolNode: ISymbolNode) {
        return (symbolNode.getAllRelatedSymbolNodes() || []).map(relatedSymbolNode => {
            return this.getDefinitionBySymbolNode(relatedSymbolNode);
        }).filter(d => d != null);
    }

    getDefinitionBySymbolNode(symbolNode: ISymbolNode) {
        return this.definitionBySymbolNode.get(symbolNode) || this.createDefinition(symbolNode);
    }

    getFileDefinition(file: ISourceFile) {
        return this.files.getOrCreate(file, () => new FileDefinition(this, file));
    }

    getFileDefinitionFromSourceFile(sourceFile: ISourceFile) {
        return this.files.get(sourceFile);
    }

    getDefinitionsOrExpressionFromSymbolNode(symbolNode: ISymbolNode): Expression | ArrayExt<MainDefinitions> {
        if (symbolNode == null) {
            return null;
        }
        else if (symbolNode.isAlias()) {
            return new ArrayExt<MainDefinitions>(...this.getAllDefinitionsBySymbolOfSymbolNode(symbolNode.getAliasSymbolNode()));
        }
        else {
            let expression = symbolNode.getExpression();

            if (expression != null) {
                return new Expression(expression);
            }
            else {
                return new ArrayExt<MainDefinitions>(...this.getAllDefinitionsBySymbolOfSymbolNode(symbolNode));
            }
        }
    }

    fillAllCachedTypesWithDefinitions() {
        this.types.getAll().forEach(type => {
            const iType = this.types.getKeyFromValue(type);
            const symbols = iType.getSymbolNodes();

            symbols.forEach(s => {
                type.addDefinitions(this.getAllDefinitionsBySymbolOfSymbolNode(s));
            });
        });
    }

    private createDefinition(symbolNode: ISymbolNode) {
        let definition: MainDefinitions;

        if (symbolNode.isFunction()) {
            definition = new FunctionDefinition(this, symbolNode);
        }
        else if (symbolNode.isClass()) {
            definition = new ClassDefinition(this, symbolNode);
        }
        else if (symbolNode.isInterface()) {
            definition = new InterfaceDefinition(this, symbolNode);
        }
        else if (symbolNode.isEnum()) {
            definition = new EnumDefinition(symbolNode);
        }
        else if (symbolNode.isVariable()) {
            definition = new VariableDefinition(this, symbolNode);
        }
        else if (symbolNode.isTypeAlias()) {
            definition = new TypeAliasDefinition(this, symbolNode);
        }
        else if (symbolNode.isNamespace()) {
            definition = new NamespaceDefinition(this, symbolNode);
        }
        else if (symbolNode.isExportAssignment() || symbolNode.isExportDeclaration()) {
            // ignore exports here, handled in ExportableDefinition
        }
        else if (symbolNode.isTypeParameter()) {
            // ignore type parameter here, handled in TypedParameterDefinition
        }
        else if (symbolNode.isMethodSignature() || symbolNode.isFunctionType()) {
            // ignore
        }
        else {
            Logger.warn(`Unknown node kind: ${symbolNode.nodeKindToString()}`);
        }

        if (definition != null) {
            this.definitionBySymbolNode.add(symbolNode, definition);
        }

        return definition;
    }
}
