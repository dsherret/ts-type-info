import {MainFactory} from "./../../../factories";
import {FunctionParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {FunctionBinder} from "./../../base";
import {TsBaseFunctionBinder, TsExportableBinder, TsAmbientableBinder} from "./../base";
import {TsFunctionParameterBinder} from "./TsFunctionParameterBinder";

export class TsFunctionBinder extends FunctionBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsBaseFunctionBinder(mainFactory, node, FunctionParameterDefinition, TsFunctionParameterBinder),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node)
        );
    }
}
