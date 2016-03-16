import {BaseParameterDefinition} from "./../../../definitions";
import {NamedBinder} from "./NamedBinder";
import {TypeExpressionedBinder} from "./TypeExpressionedBinder";
import {DefaultExpressionedBinder} from "./DefaultExpressionedBinder";

export abstract class BaseParameterBinder {
    abstract getIsOptional(): boolean;
    abstract getIsRestParameter(): boolean;

    constructor(
        private namedBinder: NamedBinder,
        private typeExpressionedBinder: TypeExpressionedBinder,
        private defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    bind(def: BaseParameterDefinition<any>) {
        this.namedBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
        def.isOptional = this.getIsOptional();
        def.isRestParameter = this.getIsRestParameter();
    }
}
