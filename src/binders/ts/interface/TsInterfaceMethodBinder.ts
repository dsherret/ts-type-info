import {TsFactory} from "./../../../factories";
import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {InterfaceMethodBinder} from "./../../base";
import {TsBaseFunctionBinderByNodes} from "./../base";
import {TsInterfaceMethodParameterBinder} from "./TsInterfaceMethodParameterBinder";

export class TsInterfaceMethodBinder extends InterfaceMethodBinder {
    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(new TsBaseFunctionBinderByNodes(factory, nodes, InterfaceMethodParameterDefinition, TsInterfaceMethodParameterBinder));
    }
}
