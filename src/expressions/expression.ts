import {WrappedExpression} from "./../wrappers";

export class Expression {
    text: string;

    constructor(expression: WrappedExpression) {
        this.text = expression.getText();
    }
}
