import {TypeParameterDefinition, TypeExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base/BaseDefinitionBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder
    ) {
    }

    abstract getConstraintTypeExpression(): TypeExpressionDefinition;

    bind(def: TypeParameterDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        def.constraintTypeExpression = this.getConstraintTypeExpression();
    }
}
