import {WrappedExpression} from "./../wrappers";

export class Expression {
    text: string;

    constructor(expression: WrappedExpression | string) {
        if (expression instanceof WrappedExpression) {
            this.text = expression.getText();
        }
        else {
            this.text = expression;
        }
    }
}
