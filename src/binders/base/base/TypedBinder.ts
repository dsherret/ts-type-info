import {TypedDefinition, TypeDefinition} from "./../../../definitions";

export abstract class TypedBinder {
    abstract getType(): TypeDefinition;

    bind(def: TypedDefinition) {
        def.type = this.getType();
    }
}
