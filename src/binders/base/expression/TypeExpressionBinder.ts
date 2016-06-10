import {CallSignatureDefinition, TypeExpressionDefinition, TypePropertyDefinition} from "./../../../definitions";
import {ExpressionBinder} from "./ExpressionBinder";

export abstract class TypeExpressionBinder {
    abstract isArrayType(): boolean;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getArrayElementTypeExpression(): TypeExpressionDefinition;
    abstract getUnionOrIntersectionTypeExpressions(): TypeExpressionDefinition[];
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeExpressionDefinition[];

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

        def.callSignatures.push(...this.getCallSignatures());
        def.properties.push(...this.getProperties());
        def.typeArguments.push(...this.getTypeArguments());
    }
}
