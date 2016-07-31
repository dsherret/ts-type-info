import {TsType} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsExpressionBinder} from "./TsExpressionBinder";

export class TsTypeBinder extends TypeBinder {
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

    getArrayElementType() {
        const tsType = this.tsType.getArrayElementType();
        return tsType == null ? null : this.factory.getType(tsType);
    }

    getUnionOrIntersectionTypes() {
        return this.tsType.getUnionOrIntersectionTypes().map(t => this.factory.getType(t));
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
