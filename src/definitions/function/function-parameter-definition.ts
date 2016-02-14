import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: FunctionDefinition) {
        super(symbolNode, parent, DefinitionType.FunctionParameter);
    }
}
