import {ITypeExpression} from "./type-expression";
import {ISymbolNode} from "./symbol-node";
import {ISourceFileChild} from "./source-file-child";

export interface ISignature extends ISourceFileChild {
    getReturnTypeExpression(): ITypeExpression;
    getParameters(): ISymbolNode[];
    getTypeParameters(): ISymbolNode[];
    getMinArgumentCount(): number;
}
