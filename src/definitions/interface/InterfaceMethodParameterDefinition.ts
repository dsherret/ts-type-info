import {DefinitionType, BaseParameterDefinition} from "./../base";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition {
    constructor() {
        super(DefinitionType.InterfaceMethodParameter);
    }
}
