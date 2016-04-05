import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassMethodParameterBinder} from "./../../base";
import {TsBaseClassMethodParameterBinder} from "./base";

export class TsClassMethodParameterBinder extends ClassMethodParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseClassMethodParameterBinder(factory, node));
    }
}
