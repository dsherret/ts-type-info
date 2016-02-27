import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: InterfaceNewSignatureDefinition) {
        super(mainFactory, node, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
