import {TsNode} from "./../../../compiler";
import {ExpressionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base";

export class TsExpressionBinderByNode extends ExpressionBinder {
    constructor(private tsNode: TsNode) {
        super(new TsBaseDefinitionBinder());
    }

    getText() {
        return this.tsNode.getText();
    }
}
