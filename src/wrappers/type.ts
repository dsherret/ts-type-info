import {ISymbol} from "./symbol";
import {ISignature} from "./signature";
import {IType} from "./type";
import {ITypeExpression} from "./type-expression";

export interface IType {
    getText(): string;
    hasCallSignaturesAndProperties(): boolean;
    getBaseTypeExpressions(): ITypeExpression[];
    getProperties(): ISymbol[];
    getCallSignatures(): ISignature[];
    getTypeArguments(): IType[];
    getSymbols(): ISymbol[];
}
