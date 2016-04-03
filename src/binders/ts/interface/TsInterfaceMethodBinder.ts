import {TsFactory} from "./../../../factories";
import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {InterfaceMethodBinder} from "./../../base";
import {TsBaseFunctionBinder} from "./../base";
import {TsInterfaceMethodParameterBinder} from "./TsInterfaceMethodParameterBinder";

export class TsInterfaceMethodBinder extends InterfaceMethodBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(
            new TsBaseFunctionBinder(tsFactory, node, InterfaceMethodParameterDefinition, TsInterfaceMethodParameterBinder)
        );
    }
}
