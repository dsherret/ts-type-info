import {TsFactory} from "./../../../factories";
import {FunctionParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {FunctionBinder} from "./../../base";
import {TsBaseFunctionBinder, TsExportableBinder, TsAmbientableBinder, TsFunctionBodyWriteableBinder} from "./../base";
import {TsFunctionParameterBinder} from "./TsFunctionParameterBinder";

export class TsFunctionBinder extends FunctionBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseFunctionBinder(factory, node, FunctionParameterDefinition, TsFunctionParameterBinder),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsFunctionBodyWriteableBinder()
        );
    }
}
