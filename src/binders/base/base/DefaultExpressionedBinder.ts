import {DefaultExpressionedDefinition, ExpressionDefinition} from "./../../../definitions";

export abstract class DefaultExpressionedBinder {
    abstract getDefaultExpression(): ExpressionDefinition;

    bind(def: DefaultExpressionedDefinition) {
        def.defaultExpression = this.getDefaultExpression();
    }
}
