import {DefaultExpressionedDefinition} from "./../../../definitions";
import {Expression} from "./../../../expressions";

export abstract class DefaultExpressionedBinder {
    abstract getDefaultExpression(): Expression;

    bind(def: DefaultExpressionedDefinition) {
        def.defaultExpression = this.getDefaultExpression();
    }
}
