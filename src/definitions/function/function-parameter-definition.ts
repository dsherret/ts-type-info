import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: FunctionDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.FunctionParameter);
    }
}
