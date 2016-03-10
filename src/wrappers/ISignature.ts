import {ITypeExpression} from "./ITypeExpression";
import {ISymbol} from "./ISymbol";
import {ISourceFileChild} from "./ISourceFileChild";

export interface ISignature extends ISourceFileChild {
    getReturnTypeExpression(): ITypeExpression;
    getParameters(): ISymbol[];
    getTypeParameters(): ISymbol[];
    getMinArgumentCount(): number;
}
