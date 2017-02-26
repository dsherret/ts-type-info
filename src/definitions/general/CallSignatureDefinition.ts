import * as typeConstants from "./../../typeConstants";
import {TypeParameterStructure, CallSignatureParameterStructure, UserDefinedTypeGuardStructure} from "./../../structures";
import {MainFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {TypeParameteredDefinition, BaseDefinition, ReturnTypedDefinition, ParameteredDefinition, NodedDefinition, DocumentationedDefinition,
    UserDefinedTypeGuardedDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeDefinition} from "./../expression";
import {CallSignatureParameterDefinition} from "./CallSignatureParameterDefinition";
import {UserDefinedTypeGuardDefinition} from "./UserDefinedTypeGuardDefinition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, ReturnTypedDefinition,
            NodedDefinition, DocumentationedDefinition {
    addParameter(structure: CallSignatureParameterStructure) {
        const def = new MainFactory().createStructureFactory().getCallSignatureParameter(structure);
        this.parameters.push(def);
        return def;
    }

    getMinArgumentCount() {
        return this.parameters.filter(p => !p.isOptional && !p.isRestParameter).length;
    }

    // ParameteredDefinition
    parameters: CallSignatureParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: CallSignatureParameterDefinition) => boolean)) => (CallSignatureParameterDefinition | null);
    // ReturnTyped
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => (TypeParameterDefinition | null);
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
    // UserDefinedTypeGuardedDefinition
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;
    setUserDefinedTypeGuard: (structure: UserDefinedTypeGuardStructure) => this;
}

applyMixins(CallSignatureDefinition, BaseDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, NodedDefinition, DocumentationedDefinition,
    UserDefinedTypeGuardedDefinition]);
