import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {CallSignatureDefinition} from "./call-signature-definition";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: CallSignatureDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.CallSignatureParameter);
    }
}
