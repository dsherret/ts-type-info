import {ITypeExpression} from "./../ITypeExpression";
import {ISymbol} from "./../ISymbol";
import {ISignature} from "./../ISignature";
import {StructureSourceFileChild} from "./StructureSourceFileChild";

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
