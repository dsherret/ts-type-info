import {ITypeExpression} from "./../type-expression";
import {ISymbolNode} from "./../symbol-node";
import {ISignature} from "./../signature";
import {StructureSourceFileChildBase} from "./structure-source-file-child-base";

export class StructureSignature extends StructureSourceFileChildBase implements ISignature  {
    getReturnTypeExpression(): ITypeExpression {
        return null;
    }

    getParameters(): ISymbolNode[] {
        return [];
    }

    getTypeParameters(): ISymbolNode[] {
        return [];
    }

    getMinArgumentCount(): number {
        return 0;
    }
}
