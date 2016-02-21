import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: FunctionDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.FunctionParameter);
    }
}
