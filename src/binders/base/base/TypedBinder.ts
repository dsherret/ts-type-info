import {TypedDefinition, TypeNodeDefinition} from "./../../../definitions";

export abstract class TypedBinder {
    abstract getType(): TypeNodeDefinition;

    bind(def: TypedDefinition) {
        def.type = this.getType();
    }
}
