import {TsType} from "./../../../../compiler";
import {TypePropertyDefinition} from "./../../../../definitions";
import {TsFactory} from "./../../../../factories";
import {BaseTypeBinder} from "./../../../base";
import {TsExpressionBinder} from "./../TsExpressionBinder";

export class TsBaseTypeBinderByType extends BaseTypeBinder {
    private readonly getCallSignatureAndProperties: boolean;

    constructor(private readonly factory: TsFactory, private readonly tsType: TsType) {
        super(new TsExpressionBinder(tsType));

        this.getCallSignatureAndProperties = tsType.isAnonymousType() && !tsType.isReferenceType() &&
            !tsType.isClassType() && !tsType.isInterfaceType() && !tsType.isUnionType() && !tsType.isIntersectionType() &&
            !tsType.isTupleType();
    }

    isArrayType() {
        return this.tsType.isArrayType();
    }

    getArrayElementType() {
        const tsType = this.tsType.getArrayElementType();
        return tsType == null ? null : this.factory.getType(tsType, null);
    }

    isIntersectionType() {
        return this.tsType.isIntersectionType();
    }

    isUnionType() {
        return this.tsType.isUnionType();
    }

    getUnionOrIntersectionTypes() {
        return this.tsType.getUnionOrIntersectionTypes().map(t => this.factory.getType(t, null));
    }

    getProperties() {
        if (this.getCallSignatureAndProperties) {
            return this.tsType.getProperties().map(p => this.factory.getTypePropertyFromSymbol(p));
        }
        else {
            return [] as TypePropertyDefinition[];
        }
    }

    getTypeArguments() {
        return this.tsType.getTypeArguments().map(arg => this.factory.getType(arg, null));
    }
}
