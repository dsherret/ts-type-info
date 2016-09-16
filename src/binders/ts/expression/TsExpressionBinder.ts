import {TsExpression, TsType, TsTypeNode} from "./../../../compiler";
import {ExpressionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsExpressionBinder extends ExpressionBinder {
    constructor(private readonly tsExpression: TsExpression | TsType | TsTypeNode) {
        super(new TsBaseDefinitionBinder());
    }

    getText() {
        return this.tsExpression.getText();
    }
}
