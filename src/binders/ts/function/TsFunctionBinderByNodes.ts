import {TsFactory} from "./../../../factories";
import {FunctionParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {FunctionBinder} from "./../../base";
import {TsBaseFunctionBinderByNodes, TsExportableBinder, TsAmbientableBinder, TsAsyncableBinder, TsFunctionBodyWriteableBinder} from "./../base";
import {TsFunctionParameterBinder} from "./TsFunctionParameterBinder";

export class TsFunctionBinderByNodes extends FunctionBinder {
    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(
            new TsBaseFunctionBinderByNodes(factory, nodes, FunctionParameterDefinition, TsFunctionParameterBinder),
            new TsExportableBinder(nodes[nodes.length - 1]),
            new TsAmbientableBinder(nodes[nodes.length - 1]),
            new TsAsyncableBinder(nodes[nodes.length - 1]),
            new TsFunctionBodyWriteableBinder()
        );
    }
}
