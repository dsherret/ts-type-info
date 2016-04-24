import {BasePropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {TypeExpressionedBinder} from "./TypeExpressionedBinder";

export abstract class BasePropertyBinder {
    abstract getIsOptional(): boolean;

    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private typeExpressionedBinder: TypeExpressionedBinder
    ) {
    }

    bind(def: BasePropertyDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        def.isOptional = this.getIsOptional();
    }
}
