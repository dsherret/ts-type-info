import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./FunctionDefinition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor() {
        super(DefinitionType.FunctionParameter);
    }
}
