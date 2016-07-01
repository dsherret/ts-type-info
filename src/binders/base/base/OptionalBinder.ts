import {OptionalDefinition} from "./../../../definitions";

export abstract class OptionalBinder {
    abstract getIsOptional(): boolean;

    bind(def: OptionalDefinition) {
        def.isOptional = this.getIsOptional();
    }
}
