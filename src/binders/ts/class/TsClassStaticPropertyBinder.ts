import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassStaticPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseClassPropertyBinder(factory, node));
    }
}
