import {TsNode} from "./../../../compiler";
import {MainFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderByNode extends ReturnTypedBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super();
    }

    getReturnTypeExpression() {
        return this.mainFactory.getTypeExpression(this.node.getReturnTypeExpression());
    }
}
