import {ITypeExpression} from "./type-expression";
import {ISymbolNode} from "./symbol-node";

export interface ISignature {
    getReturnTypeExpression(): ITypeExpression;
    getParameters(): ISymbolNode[];
    getTypeParameters(): ISymbolNode[];
    getMinArgumentCount(): number;
}
