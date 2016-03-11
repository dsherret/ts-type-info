import {IExpression} from "./../wrappers";

export class Expression {
    text: string;

    constructor(expression: IExpression) {
        this.text = expression.getText();
    }
}
