import {BaseParameterDefinition, ObjectPropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {TypeExpressionedBinder} from "./TypeExpressionedBinder";
import {DefaultExpressionedBinder} from "./DefaultExpressionedBinder";

export abstract class BaseParameterBinder {
    abstract getIsOptional(): boolean;
    abstract getIsRestParameter(): boolean;
    abstract getDestructuringProperties(): ObjectPropertyDefinition[];

    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private typeExpressionedBinder: TypeExpressionedBinder,
        private defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    bind(def: BaseParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.typeExpressionedBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
        def.isOptional = this.getIsOptional();
        def.isRestParameter = this.getIsRestParameter();
        def.destructuringProperties = this.getDestructuringProperties();

        if (def.destructuringProperties.length > 0) {
            def.name = null;
        }
    }
}
