import {DefinitionType, BaseParameterDefinition} from "./../base";

export class FunctionParameterDefinition extends BaseParameterDefinition {
    constructor() {
        super(DefinitionType.FunctionParameter);
    }
}
