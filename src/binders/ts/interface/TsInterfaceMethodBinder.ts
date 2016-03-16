import {MainFactory} from "./../../../factories";
import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../wrappers";
import {InterfaceMethodBinder} from "./../../base";
import {TsBaseFunctionBinder} from "./../base";
import {TsInterfaceMethodParameterBinder} from "./TsInterfaceMethodParameterBinder";

export class TsInterfaceMethodBinder extends InterfaceMethodBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsBaseFunctionBinder(mainFactory, node, InterfaceMethodParameterDefinition, TsInterfaceMethodParameterBinder)
        );
    }
}
