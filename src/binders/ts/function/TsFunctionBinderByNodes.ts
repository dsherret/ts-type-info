import {TsFactory} from "./../../../factories";
import {FunctionParameterDefinition, FunctionDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {FunctionBinder} from "./../../base";
import {TsBaseFunctionBinderByNodes, TsExportableBinder, TsAmbientableBinder, TsAsyncableBinder, TsFunctionBodyWriteableBinder} from "./../base";
import {overloadsToImplementationSignature} from "./../helpers";
import {TsFunctionParameterBinder} from "./TsFunctionParameterBinder";

export class TsFunctionBinderByNodes extends FunctionBinder {
    constructor(factory: TsFactory, private nodes: TsNode[]) {
        super(
            new TsBaseFunctionBinderByNodes(factory, nodes, FunctionParameterDefinition, TsFunctionParameterBinder),
            new TsExportableBinder(nodes[nodes.length - 1]),
            new TsAmbientableBinder(nodes[nodes.length - 1]),
            new TsAsyncableBinder(nodes[nodes.length - 1]),
            new TsFunctionBodyWriteableBinder()
        );
    }

    bind(def: FunctionDefinition) {
        super.bind(def);

        const isAmbient = this.nodes.length > 0 && this.nodes[0].isAmbient();

        if (isAmbient)
            overloadsToImplementationSignature(def);
    }
}
