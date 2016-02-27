import {ISymbol} from "./../symbol";
import {ISignature} from "./../signature";
import {ITypeExpression} from "./../type-expression";
import {IType} from "./../type";

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
