import {ISymbolNode} from "./../symbol-node";
import {ISignature} from "./../signature";
import {IType} from "./../type";

export class StructureType implements IType {
    getText() {
        return "";
    }

    hasCallSignaturesAndProperties() {
        return false;
    }

    getProperties(): ISymbolNode[] {
        return [];
    }

    getCallSignatures(): ISignature[] {
        return [];
    }

    getTypeArguments(): IType[] {
        return [];
    }

    getSymbolNodes(): ISymbolNode[] {
        return [];
    }
}
