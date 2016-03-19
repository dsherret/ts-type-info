import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfaceMethodParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsInterfaceMethodParameterBinder extends InterfaceMethodParameterBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(new TsBaseParameterBinder(tsFactory, node));
    }
}
