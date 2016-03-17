import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {NamespaceBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsModuledBinder} from "./../base";

export class TsNamespaceBinder extends NamespaceBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsModuledBinder(mainFactory, node)
        );
    }

    getNamespaceDeclarationType() {
        return this.node.getNamespaceDeclarationType();
    }
}
