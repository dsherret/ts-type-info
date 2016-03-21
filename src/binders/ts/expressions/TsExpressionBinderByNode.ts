import {TsNode} from "./../../../compiler";
import {ExpressionBinder} from "./../../base";

export class TsExpressionBinderByNode extends ExpressionBinder {
    constructor(private tsNode: TsNode) {
        super();
    }

    getText() {
        return this.tsNode.getText();
    }
}
