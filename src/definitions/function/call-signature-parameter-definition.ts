import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {CallSignatureDefinition} from "./call-signature-definition";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: CallSignatureDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.CallSignatureParameter);
    }
}
