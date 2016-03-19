import {TypeParameterDefinition, TypeParameteredDefinition, TypeParameteredDefinitions} from "./../../../definitions";

export abstract class TypeParameteredBinder {
    abstract getTypeParameters(): TypeParameterDefinition[];

    bind(def: TypeParameteredDefinition) {
        def.typeParameters.push(...this.getTypeParameters());
        def.typeParameters.forEach(p => p.parent = def as TypeParameteredDefinitions);
    }
}
