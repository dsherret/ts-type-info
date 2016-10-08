import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {VariableBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsDefaultExpressionedBinder, TsTypedBinder, TsNodedBinder} from "./../base";

export class TsVariableBinder extends VariableBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypedBinder(factory, node),
            new TsDefaultExpressionedBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }

    getDeclarationType() {
        return this.node.getVariableDeclarationType();
    }
}
