import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType, ParameteredDefinition, ReturnTypedDefinition} from "./../base";
import {TypeExpressionDefinition} from "./../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./InterfaceNewSignatureParameterDefinition";

export class InterfaceNewSignatureDefinition extends BaseDefinition implements ParameteredDefinition<InterfaceNewSignatureParameterDefinition>, ReturnTypedDefinition {
    constructor() {
        super(DefinitionType.InterfaceNewSignature);
    }

    // ParameteredDefinition
    parameters: InterfaceNewSignatureParameterDefinition[];
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
}

applyMixins(InterfaceNewSignatureDefinition, BaseDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
