import {ITypeExpression} from "./../type-expression";
import {ISymbol} from "./../symbol";
import {ISignature} from "./../signature";
import {StructureSourceFileChild} from "./structure-source-file-child";

export class StructureSignature extends StructureSourceFileChild implements ISignature  {
    getReturnTypeExpression(): ITypeExpression {
        return null;
    }

    getParameters(): ISymbol[] {
        return [];
    }

    getTypeParameters(): ISymbol[] {
        return [];
    }

    getMinArgumentCount(): number {
        return 0;
    }
}
