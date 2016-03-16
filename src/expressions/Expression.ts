import {TsExpression} from "./../wrappers";

export class Expression {
    text: string;

    constructor(expression: TsExpression) {
        this.text = expression.getText();
    }
}
