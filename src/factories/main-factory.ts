import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        MainDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition} from "./../definitions";
import {Expression, Type, TypeExpression} from "./../expressions";
import {KeyValueCache, Logger, ArrayExt} from "./../utils";
import {ISourceFile, INode, IType, ITypeExpression, IImportClause, ISymbol} from "./../wrappers";

export class MainFactory {
    private definitionByNode = new KeyValueCache<INode, MainDefinitions>();
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
        const definitions = this.getAllDefinitionsBySymbol(opts.importClause.getSymbol());

        return (definitions || []).map(definition => new ImportDefinition(
            opts.importClause,
            definition,
            opts.parent
        ));
    }

    getReExportDefinitions(opts: { symbol: ISymbol; parent: FileDefinition; }) {
        const definitions = this.getAllDefinitionsBySymbol(opts.symbol);

        return (definitions || []).map(definition => new ReExportDefinition(
            this.getFileDefinitionFromSourceFile(opts.symbol.getSourceFile()),
            definition,
            opts.parent
        ));
    }

    getAllDefinitionsBySymbol(symbol: ISymbol) {
        return (symbol.getNodes() || []).map(node => {
            return this.getDefinitionByNode(node);
        }).filter(d => d != null);
    }

    getDefinitionByNode(node: INode) {
        return this.definitionByNode.get(node) || this.createDefinition(node);
    }

    getFileDefinition(file: ISourceFile) {
        return this.files.getOrCreate(file, () => new FileDefinition(this, file));
    }

    getFileDefinitionFromSourceFile(sourceFile: ISourceFile) {
        return this.files.get(sourceFile);
    }

    getDefinitionsOrExpressionFromSymbol(symbol: ISymbol): Expression | ArrayExt<MainDefinitions> {
        if (symbol == null) {
            return null;
        }
        else if (symbol.isAlias()) {
            return new ArrayExt<MainDefinitions>(...this.getAllDefinitionsBySymbol(symbol.getAliasSymbol()));
        }
        else {
            const node = symbol.getOnlyNode();

            if (node != null) {
                const expression = node.getExpression();

                if (expression != null) {
                    return new Expression(expression);
                }
            }
        }

        return new ArrayExt<MainDefinitions>();
    }

    fillAllCachedTypesWithDefinitions() {
        this.types.getAll().forEach(type => {
            const iType = this.types.getKeyFromValue(type);
            const symbols = iType.getSymbols();

            symbols.forEach(s => {
                type.addDefinitions(this.getAllDefinitionsBySymbol(s));
            });
        });
    }

    private createDefinition(node: INode) {
        let definition: MainDefinitions;

        if (node.isFunction()) {
            definition = new FunctionDefinition(this, node);
        }
        else if (node.isClass()) {
            definition = new ClassDefinition(this, node);
        }
        else if (node.isInterface()) {
            definition = new InterfaceDefinition(this, node);
        }
        else if (node.isEnum()) {
            definition = new EnumDefinition(node);
        }
        else if (node.isVariable()) {
            definition = new VariableDefinition(this, node);
        }
        else if (node.isTypeAlias()) {
            definition = new TypeAliasDefinition(this, node);
        }
        else if (node.isNamespace()) {
            definition = new NamespaceDefinition(this, node);
        }
        else if (node.isExportAssignment() || node.isExportDeclaration()) {
            // ignore exports here, handled in ExportableDefinition
        }
        else if (node.isTypeParameter()) {
            // ignore type parameter here, handled in TypedParameterDefinition
        }
        else if (node.isMethodSignature() || node.isFunctionType()) {
            // ignore
        }
        else if (node.isImport()) {
            // ignore imports here, handled in FileDefinition
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
