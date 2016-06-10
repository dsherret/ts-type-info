import {CallSignatureDefinition, TypeDefinition, TypePropertyDefinition} from "./../../../definitions";
import {ExpressionBinder} from "./ExpressionBinder";

export abstract class TypeBinder {
    abstract isArrayType(): boolean;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getarrayElementType(): TypeDefinition;
    abstract getUnionOrIntersectionTypes(): TypeDefinition[];
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeDefinition[];

    constructor(private expressionBinder: ExpressionBinder) {
    }

    bind(def: TypeDefinition) {
        this.expressionBinder.bind(def);

        if (this.isArrayType()) {
            def.arrayElementType = this.getarrayElementType();
        }

        if (this.isUnionType()) {
            def.unionTypes.push(...this.getUnionOrIntersectionTypes());
        }
        else if (this.isIntersectionType()) {
            def.intersectionTypes.push(...this.getUnionOrIntersectionTypes());
        }

        def.callSignatures.push(...this.getCallSignatures());
        def.properties.push(...this.getProperties());
        def.typeArguments.push(...this.getTypeArguments());
    }
}
