import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeExpressionedBinder} from "./../../base";

export class TsTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private tsFactory: TsFactory, private node: TsNode) {
        super();
    }

    getTypeExpression() {
        return this.tsFactory.getTypeExpression(this.node.getTypeExpression());
    }
}
