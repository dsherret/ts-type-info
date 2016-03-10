import {ISymbol} from "./../ISymbol";
import {ISignature} from "./../ISignature";
import {ITypeExpression} from "./../ITypeExpression";
import {IType} from "./../IType";

export class StructureType implements IType {
    constructor(private expressionText: string) {
    }

    getText() {
        return this.expressionText;
    }

    hasCallSignaturesAndProperties() {
        return false;
    }

    getBaseTypeExpressions(): ITypeExpression[] {
        return [];
    }

    getCallSignatures(): ISignature[] {
        return [];
    }

    getProperties(): ISymbol[] {
        return [];
    }

    getSymbols(): ISymbol[] {
        return [];
    }

    getTypeArguments(): IType[] {
        return [];
    }

    getSymbolNodes(): ISymbol[] {
        return [];
    }
}
