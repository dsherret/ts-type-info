import {DefinitionType, BaseParameterDefinition} from "./../base";
import {CallSignatureDefinition} from "./CallSignatureDefinition";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor() {
        super(DefinitionType.CallSignatureParameter);
    }
}
