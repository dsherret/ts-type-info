import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBasePropertyBinder} from "./../base/TsBasePropertyBinder";

export class TsTypePropertyBinder extends TypePropertyBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(new TsBasePropertyBinder(factory, node));
    }
}
