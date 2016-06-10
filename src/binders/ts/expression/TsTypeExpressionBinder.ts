import {TsType} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeExpressionBinder} from "./../../base";
import {TsExpressionBinder} from "./TsExpressionBinder";

export class TsTypeExpressionBinder extends TypeExpressionBinder {
    constructor(private factory: TsFactory, private tsType: TsType) {
        super(new TsExpressionBinder(tsType));
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
        return this.factory.getTypeExpressionFromType(this.tsType.getArrayElementType());
    }

    getUnionOrIntersectionTypeExpressions() {
        return this.tsType.getUnionOrIntersectionTypeExpressions().map(t => this.factory.getTypeExpressionFromType(t));
    }
}
