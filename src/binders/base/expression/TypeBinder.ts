import {CallSignatureDefinition, TypeNodeDefinition, TypePropertyDefinition, TypeParameterDefinition, TypeFunctionParameterDefinition} from "./../../../definitions";
import {ParameteredBinder} from "./../base";
import {ExpressionBinder} from "./ExpressionBinder";

export abstract class TypeBinder {
    abstract isArrayType(): boolean;
    abstract getArrayElementType(): TypeNodeDefinition | null;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getUnionOrIntersectionTypes(): TypeNodeDefinition[];
    abstract getResolvedType(): TypeNodeDefinition | null;
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeNodeDefinition[];
    abstract getTypeParameters(): TypeParameterDefinition[];

    constructor(
        private readonly expressionBinder: ExpressionBinder,
        private readonly parameterBinder: ParameteredBinder<TypeFunctionParameterDefinition>,
    ) {
    }

    bind(def: TypeNodeDefinition) {
        this.expressionBinder.bind(def);
        this.parameterBinder.bind(def);

        if (this.isUnionType())
            def.unionTypes.push(...this.getUnionOrIntersectionTypes());
        else if (this.isIntersectionType())
            def.intersectionTypes.push(...this.getUnionOrIntersectionTypes());
        if (this.isArrayType())
            def.arrayElementType = this.getArrayElementType();
        def.callSignatures.push(...this.getCallSignatures());
        def.properties.push(...this.getProperties());
        def.typeArguments.push(...this.getTypeArguments());
        def.typeParameters.push(...this.getTypeParameters());
    }
}
