import {BasePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {OptionalBinder} from "./OptionalBinder";
import {TypedBinder} from "./TypedBinder";

export abstract class BasePropertyBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private optionalBinder: OptionalBinder,
        private TypedBinder: TypedBinder
    ) {
    }

    bind(def: BasePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.optionalBinder.bind(def);
        this.TypedBinder.bind(def);
    }
}
