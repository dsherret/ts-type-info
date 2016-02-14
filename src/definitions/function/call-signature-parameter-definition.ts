import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {CallSignatureDefinition} from "./call-signature-definition";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: CallSignatureDefinition) {
        super(symbolNode, parent, DefinitionType.CallSignatureParameter);
    }
}
