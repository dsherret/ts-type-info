import {Expression} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
    fillDefaultExpression(symbolNode: ISymbolNode): void;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;

    fillDefaultExpression(symbolNode: ISymbolNode) {
        const expression = symbolNode.getDefaultExpression();

        if (expression != null) {
            this.defaultExpression = new Expression(expression);
        }
    }
}
