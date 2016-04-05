import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeExpressionedBinder} from "./../../base";

export class TsTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getTypeExpression() {
        return this.factory.getTypeExpression(this.node.getTypeExpression());
    }
}
