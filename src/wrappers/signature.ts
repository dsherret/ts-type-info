import {ITypeExpression} from "./type-expression";
import {ISymbol} from "./symbol";
import {ISourceFileChild} from "./source-file-child";

export interface ISignature extends ISourceFileChild {
    getReturnTypeExpression(): ITypeExpression;
    getParameters(): ISymbol[];
    getTypeParameters(): ISymbol[];
    getMinArgumentCount(): number;
}
