import {TsTypeExpression} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeExpressionBinder} from "./../../base";
import {TsExpressionBinder} from "./TsExpressionBinder";

export class TsTypeExpressionBinder extends TypeExpressionBinder {
    constructor(private factory: TsFactory, private tsTypeExpression: TsTypeExpression) {
        super(new TsExpressionBinder(tsTypeExpression));
    }

    isArrayType() {
        return this.tsTypeExpression.isArrayType();
    }

    isIntersectionType() {
        return this.tsTypeExpression.isIntersectionType();
    }

    isUnionType() {
        return this.tsTypeExpression.isUnionType();
    }

    getArrayElementTypeExpression() {
        return this.factory.getTypeExpression(this.tsTypeExpression.getArrayElementTypeExpression());
    }

    getUnionOrIntersectionTypeExpressions() {
        return this.tsTypeExpression.getUnionOrIntersectionTypeExpressions().map(t => this.factory.getTypeExpression(t));
    }
}
