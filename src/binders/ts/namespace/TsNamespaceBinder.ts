import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {NamespaceBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsExportableBinder, TsAmbientableBinder, TsModuledBinder, TsNodedBinder} from "./../base";

export class TsNamespaceBinder extends NamespaceBinder {
    constructor(factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsModuledBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }

    getNamespaceDeclarationType() {
        return this.node.getNamespaceDeclarationType();
    }
}
