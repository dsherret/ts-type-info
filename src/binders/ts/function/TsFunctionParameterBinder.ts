import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {FunctionParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsFunctionParameterBinder extends FunctionParameterBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(new TsBaseParameterBinder(tsFactory, node));
    }
}
