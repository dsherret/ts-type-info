import {InterfacePropertyDefinition} from "./../../../definitions";
import {TsNode} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./../base/TsBasePropertyBinder";

export class TsTypePropertyBinder extends TypePropertyBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBasePropertyBinder(mainFactory, node));
    }
}
