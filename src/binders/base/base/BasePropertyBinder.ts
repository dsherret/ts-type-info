import {BasePropertyDefinition} from "./../../../definitions";
import {NamedBinder} from "./NamedBinder";
import {TypeExpressionedBinder} from "./TypeExpressionedBinder";

export abstract class BasePropertyBinder {
    abstract getIsOptional(): boolean;

    constructor(
        private namedBinder: NamedBinder,
        private typeExpressionedBinder: TypeExpressionedBinder
    ) {
    }

    bind(def: BasePropertyDefinition<any>) {
        this.namedBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        def.isOptional = this.getIsOptional();
    }
}
