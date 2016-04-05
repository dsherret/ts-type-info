import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfacePropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./../base";

export class TsInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBasePropertyBinder(factory, node));
    }
}
