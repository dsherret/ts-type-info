import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {FunctionDefinition} from "./function-definition";

export class FunctionParameterDefinition extends BaseParameterDefinition<FunctionDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: FunctionDefinition) {
        super(mainFactory, node, parent, DefinitionType.FunctionParameter);
    }
}
