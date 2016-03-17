import {TypeExpressionedDefinition, TypeExpression} from "./../../../definitions";

export abstract class TypeExpressionedBinder {
    abstract getTypeExpression(): TypeExpression;

    bind(def: TypeExpressionedDefinition) {
        def.typeExpression = this.getTypeExpression();
    }
}
