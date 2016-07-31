import {DefaultExpressionedDefinition, ExpressionDefinition} from "./../../../definitions";

export abstract class DefaultExpressionedBinder {
    abstract getDefaultExpression(): ExpressionDefinition | null;

    bind(def: DefaultExpressionedDefinition) {
        def.defaultExpression = this.getDefaultExpression();
    }
}
