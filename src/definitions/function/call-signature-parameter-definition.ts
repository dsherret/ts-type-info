import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {CallSignatureDefinition} from "./call-signature-definition";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: CallSignatureDefinition) {
        super(mainFactory, node, parent, DefinitionType.CallSignatureParameter);
    }
}
