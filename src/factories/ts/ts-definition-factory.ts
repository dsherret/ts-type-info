import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        MainDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition} from "./../../definitions";
import {Expression, Type, TypeExpression} from "./../../expressions";
import {KeyValueCache, Logger, ArrayExt} from "./../../utils";
import {ISourceFile, ISymbolNode, INode, IExpression, IType, ITypeExpression} from "./../../wrappers";
import {IDefinitionFactory} from "./../definition-factory";

export class TsDefinitionFactory implements IDefinitionFactory {
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

    getImportDefinitions(opts: { symbol: ISymbolNode; parent: FileDefinition; }) {
        const definitions = this.getAllDefinitionsBySymbolOfSymbolNode(opts.symbol);

        return (definitions || []).map(definition => new ImportDefinition(
            this.getFileDefinitionFromSourceFile(opts.symbol.getSourceFile()),
            definition,
            opts.parent
        ));
    }

    getReExportDefinitions(opts: { symbol: ISymbolNode; parent: FileDefinition; }) {
        const definitions = this.getAllDefinitionsBySymbolOfSymbolNode(opts.symbol);

        return (definitions || []).map(definition => new ReExportDefinition(
            this.getFileDefinitionFromSourceFile(opts.symbol.getSourceFile()),
            definition,
            opts.parent
        ));
    }

    getAllDefinitionsBySymbolOfSymbolNode(symbol: ISymbolNode) {
        return (symbol.getAllRelatedSymbolNodes() || []).map(symbolNode => {
            return this.getDefinitionBySymbolNode(symbolNode);
        }).filter(d => d != null);
    }

    getDefinitionBySymbolNode(symbolNode: ISymbolNode) {
        return this.definitionBySymbolNode.get(symbolNode) || this.createDefinition(symbolNode);
    }

    getFileDefinition(file: ISourceFile) {
        let fileDefinition = this.files.get(file);

        /* istanbul ignore else */
        if (fileDefinition == null) {
            fileDefinition = new FileDefinition(this, file);

            this.files.add(file, fileDefinition);
        }

        return fileDefinition;
    }

    getFileDefinitionFromSourceFile(sourceFile: ISourceFile) {
        return this.files.get(sourceFile);
    }

    getDefinitionsOrExpressionFromSymbol(symbol: ISymbolNode): Expression | ArrayExt<MainDefinitions> {
        if (symbol == null) {
            return null;
        }
        else if (symbol.isAlias()) {
            return new ArrayExt<MainDefinitions>(...this.getAllDefinitionsBySymbolOfSymbolNode(symbol.getAliasSymbolNode()));
        }
        else {
            let expression = symbol.getExpression();

            if (expression != null) {
                return new Expression(expression);
            }
            else {
                return new ArrayExt<MainDefinitions>(...this.getAllDefinitionsBySymbolOfSymbolNode(symbol));
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
