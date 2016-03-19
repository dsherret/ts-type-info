import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {VariableBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsDefaultExpressionedBinder, TsTypeExpressionedBinder} from "./../base";

export class TsVariableBinder extends VariableBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeExpressionedBinder(tsFactory, node),
            new TsDefaultExpressionedBinder(node)
        );
    }

    getDeclarationType() {
        return this.node.getVariableDeclarationType();
    }
}
