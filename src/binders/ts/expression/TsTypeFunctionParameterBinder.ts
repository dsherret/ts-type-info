import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeFunctionParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsTypeFunctionParameterBinder extends TypeFunctionParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(new TsBaseParameterBinder(factory, node));
    }
}
