import {BasePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {OptionalBinder} from "./OptionalBinder";
import {TypedBinder} from "./TypedBinder";
import {ReadonlyableBinder} from "./ReadonlyableBinder";

export abstract class BasePropertyBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly optionalBinder: OptionalBinder,
        private readonly typedBinder: TypedBinder,
        private readonly readonlyableBinder: ReadonlyableBinder
    ) {
    }

    bind(def: BasePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.optionalBinder.bind(def);
        this.typedBinder.bind(def);
        this.readonlyableBinder.bind(def);
    }
}
