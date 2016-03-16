import {TypeParameterDefinition, TypeParameteredDefinition} from "./../../../definitions";
import {TypeExpression} from "./../../../expressions";

export abstract class TypeParameteredBinder {
    abstract getTypeParameters(): TypeParameterDefinition<TypeParameteredDefinition>[];

    bind(def: TypeParameteredDefinition) {
        def.typeParameters.push(...this.getTypeParameters());
        def.typeParameters.forEach(p => p.parent = def);
    }
}
