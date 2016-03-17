import {TypeExpressionedDefinition, TypeExpressionDefinition} from "./../../../definitions";

export abstract class TypeExpressionedBinder {
    abstract getTypeExpression(): TypeExpressionDefinition;

    bind(def: TypeExpressionedDefinition) {
        def.typeExpression = this.getTypeExpression();
    }
}
