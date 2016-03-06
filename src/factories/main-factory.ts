import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        NodeDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition, ModuleMemberDefinitions, ExportableDefinitions} from "./../definitions";
import {Expression, Type, TypeExpression} from "./../expressions";
import {KeyValueCache, Logger} from "./../utils";
import {ISourceFile, INode, IType, ITypeExpression, ISymbol} from "./../wrappers";

export class MainFactory {
    private definitionByNode = new KeyValueCache<INode, NodeDefinitions>();
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

    getAllDefinitionsBySymbol(symbol: ISymbol) {
        return symbol.getNodes().map(node => {
            return this.getDefinitionByNode(node);
        }).filter(d => d != null);
    }

    getDefinitionByNode(node: INode) {
        return this.definitionByNode.get(node) || this.createDefinition(node);
    }

    getFileDefinition(file: ISourceFile) {
        return this.files.getOrCreate(file, () => new FileDefinition(this, file));
    }

    getDefinitionsOrExpressionFromExportSymbol(symbol: ISymbol) {
        const obj: { definitions: ExportableDefinitions[]; expression: Expression; } = { definitions: [], expression: null };

        if (symbol != null) {
            if (symbol.isAlias()) {
                symbol = symbol.getAliasSymbol();
            }

            const nodes = symbol.getNodes();

            if (nodes.length === 1) {
                const expression = nodes[0].getExpression();

                if (expression != null) {
                    obj.expression = new Expression(expression);
                    return obj;
                }
            }

            obj.definitions.push(...this.getAllDefinitionsBySymbol(symbol) as ExportableDefinitions[]);
        }

        return obj;
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

    private createDefinition(node: INode) {
        let definition: NodeDefinitions;

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
        else if (node.isExportDeclaration()) {
            definition = new ReExportDefinition(node);
        }
        else if (node.isImport()) {
            definition = new ImportDefinition(node);
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
