import {TsNode} from "./../../../wrappers";
import {Expression} from "./../../../expressions";
import {DefaultExpressionedBinder} from "./../../base";

export class TsDefaultExpressionedBinder extends DefaultExpressionedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getDefaultExpression() {
        const expression = this.node.getDefaultExpression();
        return (expression == null) ? null : new Expression(expression);
    }
}
