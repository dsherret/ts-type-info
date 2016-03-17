import {BaseClassMethodParameterDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler"
import {ClassStaticMethodParameterBinder} from "./../../base";
import {TsBaseClassMethodParameterBinder} from "./base";

export class TsClassStaticMethodParameterBinder extends ClassStaticMethodParameterBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(new TsBaseClassMethodParameterBinder(mainFactory, node));
    }
}
