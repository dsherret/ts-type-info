import {TsNode} from "./../../../compiler";
import {MainFactory} from "./../../../factories";
import {TypeExpressionedBinder} from "./../../base";

export class TsTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super();
    }

    getTypeExpression() {
        return this.mainFactory.getTypeExpression(this.node.getTypeExpression());
    }
}
