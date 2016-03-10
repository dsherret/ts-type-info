import {Expression} from "./../../expressions";
import {INode} from "./../../wrappers";

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
    fillDefaultExpression(node: INode): void;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;

    fillDefaultExpression(node: INode) {
        const expression = node.getDefaultExpression();

        if (expression != null) {
            this.defaultExpression = new Expression(expression);
        }
    }
}
