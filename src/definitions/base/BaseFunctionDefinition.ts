import {TypeDefinition} from "./../expression";
import {CallSignatureStructure, TypeParameterStructure} from "./../../structures";
import {StructureFactory} from "./../../factories";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeParameterDefinition, CallSignatureDefinition, UserDefinedTypeGuardDefinition} from "./../general";
import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {ParameteredDefinition} from "./ParameteredDefinition";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";
import {ThisTypedDefinition} from "./ThisTypedDefinition";

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType>
        extends BaseDefinition
        implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition,
            ThisTypedDefinition {
    isGenerator: boolean;
    overloadSignatures: CallSignatureDefinition[] = [];
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;

    addOverloadSignature(structure: CallSignatureStructure) {
        const def = new StructureFactory().getCallSignature(structure);
        this.overloadSignatures.push(def);
        return def;
    }

    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.overloadSignatures, searchFunction);
    }

    // NamedDefinition
    name: string;
    // ParameteredDefinition
    parameters: ParameterType[];
    abstract addParameter(structure: ParameterStructureType): ParameterType;
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    // ThisTypedDefinition
    thisType: TypeDefinition | null;
    setThisType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // ReturnTyped
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, ThisTypedDefinition]);
