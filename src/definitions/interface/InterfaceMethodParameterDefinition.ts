import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor() {
        super(DefinitionType.InterfaceMethodParameter);
    }
}
