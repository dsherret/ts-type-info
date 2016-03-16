import {NamedDefinition} from "./../../../definitions";

export abstract class NamedBinder {
    abstract getName(): string;

    bind(def: NamedDefinition) {
        def.name = this.getName();
    }
}
