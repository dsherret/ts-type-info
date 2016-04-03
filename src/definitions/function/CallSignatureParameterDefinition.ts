import {DefinitionType, BaseParameterDefinition} from "./../base";

export class CallSignatureParameterDefinition extends BaseParameterDefinition {
    constructor() {
        super(DefinitionType.CallSignatureParameter);
    }
}
