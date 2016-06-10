import {BasePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {TypedBinder} from "./TypedBinder";

export abstract class BasePropertyBinder {
    abstract getIsOptional(): boolean;

    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private TypedBinder: TypedBinder
    ) {
    }

    bind(def: BasePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.TypedBinder.bind(def);
        def.isOptional = this.getIsOptional();
    }
}
