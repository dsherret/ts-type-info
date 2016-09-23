import {TypeParameterStructure, CallSignatureParameterStructure} from "./../../structures";
import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {TypeParameteredDefinition, BaseDefinition, DefinitionType, ReturnTypedDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeNodeDefinition} from "./../expression";
import {CallSignatureParameterDefinition} from "./CallSignatureParameterDefinition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition {

    constructor() {
        super(DefinitionType.CallSignature);
    }

    addParameter(structure: CallSignatureParameterStructure) {
        const def = new StructureFactory().getCallSignatureParameter(structure);
        this.parameters.push(def);
        return def;
    }

    getMinArgumentCount() {
        return this.parameters.filter(p => !p.isOptional && !p.isRestParameter).length;
    }

    // ParameteredDefinition
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => CallSignatureParameterDefinition;
    // ReturnTyped
    returnType: TypeNodeDefinition;
    setReturnType: (text: string) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
}

applyMixins(CallSignatureDefinition, BaseDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
