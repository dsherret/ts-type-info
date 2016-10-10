import {TypeParameterDefinition, TypeDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {NodedBinder} from "./../base/NodedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getConstraintType(): TypeDefinition | null;

    bind(def: TypeParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.nodedBinder.bind(def);
        def.constraintType = this.getConstraintType();
    }
}
