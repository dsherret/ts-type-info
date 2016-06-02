import {TypeExpressionDefinition} from "./../expression";
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
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    addOverloadSignatures(...overloadSignatures: CallSignatureStructure[]) {
        const factory = new StructureFactory();
        this.overloadSignatures.push(...overloadSignatures.map(s => factory.getCallSignature(s)));
        return this;
    }

    getOverloadSignature(searchFunction: (method: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.overloadSignatures, searchFunction);
    }

    // NamedDefinition
    name: string;
    // ParameteredDefinition
    parameters: ParameterType[];
    abstract addParameters(...parameters: ParameterStructureType[]): this;
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
    setReturnTypeExpression: (text: string) => any;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
