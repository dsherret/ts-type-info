import {TypeParameterDefinition, TypeDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder
    ) {
    }

    abstract getConstraintType(): TypeDefinition | null;

    bind(def: TypeParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        def.constraintType = this.getConstraintType();
    }
}
