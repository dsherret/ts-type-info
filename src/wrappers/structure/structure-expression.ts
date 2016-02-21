import {IExpression} from "./../expression";

export class StructureExpression implements IExpression {
    constructor(private expressionText: string) {
    }

    getText() {
        return this.expressionText;
    }
}
