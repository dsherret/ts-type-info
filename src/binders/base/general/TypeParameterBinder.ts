import {TypeParameterDefinition, TypeExpression} from "./../../../definitions";
import {BasePropertyBinder} from "./../base/BasePropertyBinder";
import {NamedBinder} from "./../base/NamedBinder";
import {TypeExpressionedBinder} from "./../base/TypeExpressionedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(private namedBinder: NamedBinder) {
    }

    abstract getConstraintTypeExpression(): TypeExpression;

    bind(def: TypeParameterDefinition<any>) {
        this.namedBinder.bind(def);
        def.constraintTypeExpression = this.getConstraintTypeExpression();
    }
}
