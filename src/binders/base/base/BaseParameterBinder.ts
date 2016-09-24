import {BaseParameterDefinition, ObjectPropertyDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./BaseDefinitionBinder";
import {NamedBinder} from "./NamedBinder";
import {OptionalBinder} from "./OptionalBinder";
import {TypedBinder} from "./TypedBinder";
import {DefaultExpressionedBinder} from "./DefaultExpressionedBinder";

export abstract class BaseParameterBinder {
    abstract getIsRestParameter(): boolean;
    abstract getDestructuringProperties(): ObjectPropertyDefinition[];

    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly optionalBinder: OptionalBinder,
        private readonly typedBinder: TypedBinder,
        private readonly defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    bind(def: BaseParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.optionalBinder.bind(def);
        this.typedBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
        def.isRestParameter = this.getIsRestParameter();
        def.destructuringProperties = this.getDestructuringProperties();

        if (def.destructuringProperties.length > 0) {
            def.name = null;
        }
    }
}
