import {TypeDefinition} from "./../expression";
import {CallSignatureStructure, TypeParameterStructure} from "./../../structures";
import {StructureFactory} from "./../../factories";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeParameterDefinition, CallSignatureDefinition, UserDefinedTypeGuardDefinition} from "./../general";
import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";
import {ParameteredDefinition} from "./ParameteredDefinition";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType>
        extends BaseDefinition
        implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition {
    isGenerator: boolean;
    overloadSignatures: CallSignatureDefinition[] = [];
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

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
    // ReturnTyped
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
