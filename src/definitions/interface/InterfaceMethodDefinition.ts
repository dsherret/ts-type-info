import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition> {
    constructor() {
        super(DefinitionType.InterfaceMethod);
    }
}
