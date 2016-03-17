import {TsNode} from "./../../../compiler";
import {MainFactory} from "./../../../factories";
import {InterfacePropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./../base";

export class TsInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBasePropertyBinder(mainFactory, node));
    }
}
