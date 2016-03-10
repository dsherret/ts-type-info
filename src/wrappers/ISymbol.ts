import {ITypeExpression} from "./ITypeExpression";
import {INode} from "./INode";
import {IType} from "./IType";
import {ISourceFileChild} from "./ISourceFileChild";

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
