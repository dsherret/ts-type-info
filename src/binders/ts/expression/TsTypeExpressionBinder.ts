import {TsType} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeExpressionBinder} from "./../../base";
import {TsExpressionBinder} from "./TsExpressionBinder";

export class TsTypeExpressionBinder extends TypeExpressionBinder {
    private getCallSignatureAndProperties: boolean;

    constructor(private factory: TsFactory, private tsType: TsType) {
        super(new TsExpressionBinder(tsType));

        this.getCallSignatureAndProperties = tsType.isAnonymousType() && !tsType.isReferenceType() &&
            !tsType.isClassType() && !tsType.isInterfaceType() && !tsType.isUnionType() && !tsType.isIntersectionType() &&
            !tsType.isTupleType();
    }

    isArrayType() {
        return this.tsType.isArrayType();
    }

    isIntersectionType() {
        return this.tsType.isIntersectionType();
    }

    isUnionType() {
        return this.tsType.isUnionType();
    }

    getArrayElementTypeExpression() {
        return this.factory.getType(this.tsType.getArrayElementType());
    }

    getUnionOrIntersectionTypeExpressions() {
        return this.tsType.getUnionOrIntersectionTypeExpressions().map(t => this.factory.getType(t));
    }

    getCallSignatures() {
        if (this.getCallSignatureAndProperties) {
            return this.tsType.getCallSignatures().map(c => this.factory.getCallSignatureFromSignature(c));
        }
        else {
            return [];
        }
    }

    getProperties() {
        if (this.getCallSignatureAndProperties) {
            return this.tsType.getProperties().map(p => this.factory.getTypePropertyFromSymbol(p));
        }
        else {
            return [];
        }
    }

    getTypeArguments() {
        return this.tsType.getTypeArguments().map(arg => this.factory.getType(arg));
    }
}
