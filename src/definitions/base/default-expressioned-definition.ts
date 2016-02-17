import {Expression} from "./../../expressions";
import {WrappedSymbolNode} from "./../../wrappers";
import {DefaultExpressionedStructure} from "./../../structures";

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
    fillDefaultExpression(symbolNodeOrStructure: WrappedSymbolNode | DefaultExpressionedStructure): void;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;

    fillDefaultExpression(symbolNodeOrStructure: WrappedSymbolNode | DefaultExpressionedStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            const expression = symbolNodeOrStructure.getDefaultExpression();

            if (expression != null) {
                this.defaultExpression = new Expression(expression);
            }
        }
        else {
            this.defaultExpression = new Expression(symbolNodeOrStructure.defaultExpression);
        }
    }
}
