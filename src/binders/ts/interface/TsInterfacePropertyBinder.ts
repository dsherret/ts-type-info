import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfacePropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./../base";

export class TsInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(new TsBasePropertyBinder(tsFactory, node));
    }
}
