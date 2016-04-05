import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassStaticMethodParameterBinder} from "./../../base";
import {TsBaseClassMethodParameterBinder} from "./base";

export class TsClassStaticMethodParameterBinder extends ClassStaticMethodParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseClassMethodParameterBinder(factory, node));
    }
}
