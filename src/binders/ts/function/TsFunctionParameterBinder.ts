import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {FunctionParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsNodedBinder} from "./../base";

export class TsFunctionParameterBinder extends FunctionParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseParameterBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }
}
