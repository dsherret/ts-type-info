import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {VariableBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsExportableBinder, TsAmbientableBinder, TsDefaultExpressionedBinder, TsTypedBinderByNode, TsNodedBinder,
    TsDocumentationedBinder} from "./../base";

export class TsVariableBinder extends VariableBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypedBinderByNode(factory, node),
            new TsDefaultExpressionedBinder(factory, node),
            new TsNodedBinder(factory, node),
            new TsDocumentationedBinder(node)
        );
    }

    getDeclarationType() {
        return this.node.getVariableDeclarationType();
    }
}
