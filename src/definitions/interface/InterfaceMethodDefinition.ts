import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {InterfaceDefinition} from "./InterfaceDefinition";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor() {
        super(DefinitionType.InterfaceMethod);
    }
}
