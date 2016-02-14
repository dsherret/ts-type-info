import {Expression} from "./../../expressions";
import {WrappedSymbolNode} from "./../../wrappers";

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
    fillDefaultExpression(symbolNode: WrappedSymbolNode): void;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;

    fillDefaultExpression(symbolNode: WrappedSymbolNode) {
        const expression = symbolNode.getDefaultExpression();

        if (expression != null) {
            this.defaultExpression = new Expression(expression);
        }
    }
}
