import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {ClassMethodParameterBinder} from "./../../base";
import {TsBaseClassMethodParameterBinder} from "./base";

export class TsClassMethodParameterBinder extends ClassMethodParameterBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(new TsBaseClassMethodParameterBinder(tsFactory, node));
    }
}
