import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class TsReturnTypedBinderByNode extends ReturnTypedBinder {
    constructor(private tsFactory: TsFactory, private node: TsNode) {
        super();
    }

    getReturnTypeExpression() {
        return this.tsFactory.getTypeExpression(this.node.getReturnTypeExpression());
    }
}
