import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfacePropertyBinder} from "./../../base";
import {TsBasePropertyBinder, TsNodedBinder} from "./../base";

export class TsInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBasePropertyBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }
}
