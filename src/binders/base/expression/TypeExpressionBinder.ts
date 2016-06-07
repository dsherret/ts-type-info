import {TypeExpressionDefinition} from "./../../../definitions";
import {ExpressionBinder} from "./ExpressionBinder";

export abstract class TypeExpressionBinder {
    abstract isArrayType(): boolean;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getArrayElementTypeExpression(): TypeExpressionDefinition;
    abstract getUnionOrIntersectionTypeExpressions(): TypeExpressionDefinition[];

    constructor(private expressionBinder: ExpressionBinder) {
    }

    bind(def: TypeExpressionDefinition) {
        this.expressionBinder.bind(def);

        if (this.isArrayType()) {
            def.arrayElementTypeExpression = this.getArrayElementTypeExpression();
        }

        if (this.isUnionType()) {
            def.unionTypeExpressions.push(...this.getUnionOrIntersectionTypeExpressions());
        }
        else if (this.isIntersectionType()) {
            def.intersectionTypeExpressions.push(...this.getUnionOrIntersectionTypeExpressions());
        }
    }
}
