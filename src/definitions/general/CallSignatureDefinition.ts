import {TypeParameterStructure, CallSignatureParameterStructure} from "./../../structures";
import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {TypeParameteredDefinition, BaseDefinition, DefinitionType, ReturnTypedDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpressionDefinition} from "./../expression";
import {CallSignatureParameterDefinition} from "./CallSignatureParameterDefinition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {

    constructor() {
        super(DefinitionType.CallSignature);
    }

    addParameters(...parameters: CallSignatureParameterStructure[]) {
        const factory = new StructureFactory();
        this.parameters.push(...parameters.map(p => factory.getCallSignatureParameter(p)));
        return this;
    }

    getMinArgumentCount() {
        return this.parameters.filter(p => !p.isOptional && !p.isRestParameter).length;
    }

    // ParameteredDefinition
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
}

applyMixins(CallSignatureDefinition, BaseDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
