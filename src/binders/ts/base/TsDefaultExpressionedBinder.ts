import {TsNode, TsExpression} from "./../../../compiler";
import {ExpressionDefinition} from "./../../../definitions";
import {DefaultExpressionedBinder} from "./../../base";
import {TsExpressionBinder} from "./../expressions";

export class TsDefaultExpressionedBinder extends DefaultExpressionedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getDefaultExpression() {
        const tsExpression = this.node.getDefaultExpression();
        return (tsExpression == null) ? null : this.getExpression(tsExpression);
    }

    private getExpression(tsExpression: TsExpression) {
        const expression = new ExpressionDefinition();
        const binder = new TsExpressionBinder(tsExpression);
        binder.bind(expression);
        return expression;
    }
}
