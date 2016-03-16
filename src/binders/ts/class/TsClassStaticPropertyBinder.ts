import {MainFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../wrappers";
import {ClassStaticPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassStaticPropertyBinder extends ClassStaticPropertyBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(new TsBaseClassPropertyBinder(mainFactory, node));
    }
}
