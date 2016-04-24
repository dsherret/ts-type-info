import {TsExpression, TsTypeExpression} from "./../../../compiler";
import {ExpressionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsExpressionBinder extends ExpressionBinder {
    constructor(private tsExpression: TsExpression | TsTypeExpression) {
        super(new TsBaseDefinitionBinder());
    }

    getText() {
        return this.tsExpression.getText();
    }
}
