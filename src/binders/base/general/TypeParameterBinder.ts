import {TypeParameterDefinition, TypeExpressionDefinition} from "./../../../definitions";
import {NamedBinder} from "./../base/NamedBinder";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class TypeParameterBinder implements IBaseBinder {
    constructor(private namedBinder: NamedBinder) {
    }

    abstract getConstraintTypeExpression(): TypeExpressionDefinition;

    bind(def: TypeParameterDefinition<any>) {
        this.namedBinder.bind(def);
        def.constraintTypeExpression = this.getConstraintTypeExpression();
    }
}
