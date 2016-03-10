import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./InterfaceNewSignatureDefinition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: InterfaceNewSignatureDefinition) {
        super(mainFactory, node, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
