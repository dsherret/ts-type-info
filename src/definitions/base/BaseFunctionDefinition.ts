import * as typeConstants from "./../../typeConstants";
import {CallSignatureStructure, TypeParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {TypeDefinition} from "./../expression";
import {TypeParameterDefinition, CallSignatureDefinition, UserDefinedTypeGuardDefinition} from "./../general";
import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {ParameteredDefinition} from "./ParameteredDefinition";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";
import {ThisTypedDefinition} from "./ThisTypedDefinition";
import {NodedDefinition} from "./NodedDefinition";
import {OverloadSignaturedDefinition} from "./OverloadSignaturedDefinition";

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType>
        extends BaseDefinition
        implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition,
            ThisTypedDefinition, NodedDefinition, OverloadSignaturedDefinition {
    isGenerator: boolean;
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;

    // NamedDefinition
    name: string;
    // ParameteredDefinition
    parameters: ParameterType[];
    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => (ParameterType | null);
    // ThisTypedDefinition
    thisType: TypeDefinition | null;
    setThisType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // ReturnTyped
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => (TypeParameterDefinition | null);
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // OverloadSignaturedDefinition
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => (CallSignatureDefinition | null);
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, ThisTypedDefinition,
    NodedDefinition, OverloadSignaturedDefinition]);
