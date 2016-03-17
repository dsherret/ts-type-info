import {TsNode} from "./../../../compiler"
import {MainFactory} from "./../../../factories";
import {FunctionParameterBinder} from "./../../base";
import {TsBaseParameterBinder} from "./../base";

export class TsFunctionParameterBinder extends FunctionParameterBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(new TsBaseParameterBinder(mainFactory, node));
    }
}
