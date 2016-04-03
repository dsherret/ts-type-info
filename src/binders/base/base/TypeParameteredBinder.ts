import {TypeParameterDefinition, TypeParameteredDefinition} from "./../../../definitions";

export abstract class TypeParameteredBinder {
    abstract getTypeParameters(): TypeParameterDefinition[];

    bind(def: TypeParameteredDefinition) {
        def.typeParameters.push(...this.getTypeParameters());
    }
}
