import {BaseTypeDefinition, TypeDefinition, TypePropertyDefinition} from "./../../../../definitions";
import {ExpressionBinder} from "./../ExpressionBinder";

export abstract class BaseTypeBinder {
    abstract isArrayType(): boolean;
    abstract getArrayElementType(): TypeDefinition | null;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getUnionOrIntersectionTypes(): TypeDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeDefinition[];

    constructor(private readonly expressionBinder: ExpressionBinder) {
    }

    bind(def: BaseTypeDefinition) {
        this.expressionBinder.bind(def);

        if (this.isUnionType())
            def.unionTypes.push(...this.getUnionOrIntersectionTypes());
        else if (this.isIntersectionType())
            def.intersectionTypes.push(...this.getUnionOrIntersectionTypes());
        if (this.isArrayType())
            def.arrayElementType = this.getArrayElementType();
        def.properties.push(...this.getProperties());
        def.typeArguments.push(...this.getTypeArguments());
    }
}
