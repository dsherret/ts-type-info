import {IExpression} from "./../IExpression";

export class StructureExpression implements IExpression {
    constructor(private expressionText: string) {
    }

    getText() {
        return this.expressionText;
    }
}
