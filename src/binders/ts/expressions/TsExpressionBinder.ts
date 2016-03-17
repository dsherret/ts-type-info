import {TsExpression, TsTypeExpression} from "./../../../wrappers";
import {ExpressionBinder} from "./../../base";

export class TsExpressionBinder extends ExpressionBinder {
    constructor(private tsExpression: TsExpression | TsTypeExpression) {
        super();
    }

    getText() {
        return this.tsExpression.getText();
    }
}
