import {TsExpression, TsType} from "./../../../compiler";
import {ExpressionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsExpressionBinder extends ExpressionBinder {
    constructor(private readonly tsExpression: TsExpression | TsType) {
        super(new TsBaseDefinitionBinder());
    }

    getText() {
        return this.tsExpression.getText();
    }
}
