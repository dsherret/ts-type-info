import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: FunctionDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.FunctionParameter);
    }
}
