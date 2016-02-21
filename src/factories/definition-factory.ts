import {ClassDefinition, NamespaceDefinition, EnumDefinition, FileDefinition, FunctionDefinition, InterfaceDefinition, VariableDefinition,
        MainDefinitions, TypeAliasDefinition, ImportDefinition, ReExportDefinition} from "./../definitions";
import {Expression, Type, TypeExpression} from "./../expressions";
import {KeyValueCache, Logger, ArrayExt} from "./../utils";
import {ISourceFile, ISymbolNode, INode, IExpression, IType, ITypeExpression} from "./../wrappers";

export interface IDefinitionFactory {
    getTypeExpression(typeExpression: ITypeExpression): TypeExpression;
    getType(type: IType): Type;
    getImportDefinitions(opts: { symbol: ISymbolNode; parent: FileDefinition; }): ImportDefinition[];
    getReExportDefinitions(opts: { symbol: ISymbolNode; parent: FileDefinition; }): ReExportDefinition[];
    getAllDefinitionsBySymbolOfSymbolNode(symbol: ISymbolNode): MainDefinitions[];
    getDefinitionBySymbolNode(symbolNode: ISymbolNode): MainDefinitions;
    getFileDefinition(file: ISourceFile): FileDefinition;
    getFileDefinitionFromSourceFile(sourceFile: ISourceFile): FileDefinition;
    getDefinitionsOrExpressionFromSymbol(symbol: ISymbolNode): Expression | ArrayExt<MainDefinitions>;
    fillAllCachedTypesWithDefinitions(): void;
}
