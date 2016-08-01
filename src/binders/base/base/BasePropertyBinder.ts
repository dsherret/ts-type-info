import {BasePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {OptionalBinder} from "./OptionalBinder";
import {TypedBinder} from "./TypedBinder";

export abstract class BasePropertyBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly optionalBinder: OptionalBinder,
        private readonly TypedBinder: TypedBinder
    ) {
    }

    bind(def: BasePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.optionalBinder.bind(def);
        this.TypedBinder.bind(def);
    }
}
