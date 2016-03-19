import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassStaticPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(new TsBaseClassPropertyBinder(tsFactory, node));
    }
}
