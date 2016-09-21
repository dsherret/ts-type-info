import {CallSignatureDefinition, TypeDefinition, TypePropertyDefinition, TypeParameterDefinition, TypeFunctionParameterDefinition} from "./../../../definitions";
import {ParameteredBinder} from "./../base";
import {ExpressionBinder} from "./ExpressionBinder";

export abstract class TypeBinder {
    abstract isArrayType(): boolean;
    abstract isIntersectionType(): boolean;
    abstract isUnionType(): boolean;
    abstract getArrayElementType(): TypeDefinition | null;
    abstract getUnionOrIntersectionTypes(): TypeDefinition[];
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeDefinition[];
    abstract getTypeParameters(): TypeParameterDefinition[];

    constructor(
        private readonly expressionBinder: ExpressionBinder,
        private readonly parameterBinder: ParameteredBinder<TypeFunctionParameterDefinition>,
    ) {
    }

    bind(def: TypeDefinition) {
        this.expressionBinder.bind(def);
        this.parameterBinder.bind(def);

        if (this.isArrayType()) {
            def.arrayElementType = this.getArrayElementType();
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
        def.typeParameters.push(...this.getTypeParameters());
    }
}
