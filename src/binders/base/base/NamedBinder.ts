import {NamedDefinition, OptionallyNamedDefinition} from "./../../../definitions";

export abstract class NamedBinder {
    abstract getName(): string | null;

    bind(def: NamedDefinition | OptionallyNamedDefinition) {
        def.name = this.getName();
    }
}
