import {TypeParameterDefinition, TypeNodeDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder
    ) {
    }

    abstract getConstraintType(): TypeNodeDefinition | null;

    bind(def: TypeParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        def.constraintType = this.getConstraintType();
    }
}
