import {ISymbol} from "./ISymbol";
import {ISignature} from "./ISignature";
import {IType} from "./IType";
import {ITypeExpression} from "./ITypeExpression";

export interface IType {
    getText(): string;
    hasCallSignaturesAndProperties(): boolean;
    getBaseTypeExpressions(): ITypeExpression[];
    getProperties(): ISymbol[];
    getCallSignatures(): ISignature[];
    getTypeArguments(): IType[];
    getSymbols(): ISymbol[];
}
