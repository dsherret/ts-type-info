import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassStaticPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(new TsBaseClassPropertyBinder(mainFactory, node));
    }
}
