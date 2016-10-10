import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfacePropertyBinder} from "./../../base";
import {TsBasePropertyBinderByNode, TsNodedBinder} from "./../base";

export class TsInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinderByNode(factory, node),
            new TsNodedBinder(factory, node)
        );
    }
}
