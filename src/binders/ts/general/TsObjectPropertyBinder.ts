import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ObjectPropertyBinder} from "./../../base";
import {TsBaseObjectPropertyBinder} from "./../base/TsBaseObjectPropertyBinder";

export class TsObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseObjectPropertyBinder(factory, node));
    }
}
