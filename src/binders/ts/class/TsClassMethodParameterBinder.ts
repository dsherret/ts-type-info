import {BaseClassMethodParameterDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../wrappers";
import {ClassMethodParameterBinder} from "./../../base";
import {TsBaseClassMethodParameterBinder} from "./base";

export class TsClassMethodParameterBinder extends ClassMethodParameterBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(new TsBaseClassMethodParameterBinder(mainFactory, node));
    }
}
