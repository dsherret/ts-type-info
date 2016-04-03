import {TypeParameterStructure, CallSignatureParameterStructure} from "./../../structures";
import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {TypeParameteredDefinition, BaseDefinition, DefinitionType, ReturnTypedDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpressionDefinition} from "./../expressions";
import {CallSignatureParameterDefinition} from "./CallSignatureParameterDefinition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {
    minArgumentCount: number;

    constructor() {
        super(DefinitionType.CallSignature);
    }

    addParameters(...parameters: CallSignatureParameterStructure[]) {
        const factory = new StructureFactory();
        parameters.forEach(parameter => {
            this.parameters.push(factory.getCallSignatureParameter(parameter));
        });
        return this;
    }

    // ParameteredDefinition
    parameters: CallSignatureParameterDefinition[];
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
}

applyMixins(CallSignatureDefinition, BaseDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
