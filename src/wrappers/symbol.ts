import {ITypeExpression} from "./type-expression";
import {INode} from "./node";
import {IType} from "./type";
import {ISourceFileChild} from "./source-file-child";

export interface ISymbol extends ISourceFileChild {
    getName(): string;
    getAliasSymbol(): ISymbol;
    getDeclaredType(): IType;
    getExportSymbols(): ISymbol[];
    getExportSymbolsByName(): { [name: string]: ISymbol; };
    getExportSymbolsOfModuleByName(): { [name: string]: ISymbol; };
    getExtendsTypeExpressions(): ITypeExpression[];
    getNodes(): INode[];
    getOnlyNode(): INode;
    isAlias(): boolean;
    isDefaultExport(): boolean;
    isExported(): boolean;
    isExportStar(): boolean;
    isNamedExport(): boolean;
    isPropertyAccessor(): boolean;
    isPropertyReadonly(): boolean;
}
