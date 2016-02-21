import {ITypeExpression} from "./type-expression";
import {ISymbolNode} from "./symbol-node";
import {ISourceFileChildBase} from "./source-file-child-base";

export interface ISignature extends ISourceFileChildBase {
    getReturnTypeExpression(): ITypeExpression;
    getParameters(): ISymbolNode[];
    getTypeParameters(): ISymbolNode[];
    getMinArgumentCount(): number;
}
