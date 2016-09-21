import {ModuleMemberDefinitions, TypeParameteredDefinition, TypeParameterDefinition, ParameteredDefinition} from "./../../definitions";
import {TypeParameterStructure, TypeFunctionParameterStructure} from "./../../structures";
import {ArrayUtils, DefinitionUtils, applyMixins} from "./../../utils";
import {DefinitionType} from "./../base";
import {CallSignatureDefinition, TypePropertyDefinition} from "./../general";
import {BaseExpressionDefinition} from "./BaseExpressionDefinition";
import {TypeFunctionParameterDefinition} from "./TypeFunctionParameterDefinition";

export class TypeDefinition
        extends BaseExpressionDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<TypeFunctionParameterDefinition, TypeFunctionParameterStructure> {
    arrayElementType: TypeDefinition | null = null;
    intersectionTypes: TypeDefinition[] = [];
    unionTypes: TypeDefinition[] = [];
    callSignatures: CallSignatureDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeDefinition[] = [];
    text: string;

    constructor() {
        super(DefinitionType.Type);
    }

    getAllDefinitions(): ModuleMemberDefinitions[] {
        const arraysOfDefinitions = [...this.unionTypes.map(t => t.getAllDefinitions()), ...this.intersectionTypes.map(t => t.getAllDefinitions())];
        const definitions = [...arraysOfDefinitions.reduce((a, b) => a.concat(b), []), ...this.definitions];

        if (this.arrayElementType != null) {
            definitions.push(...this.arrayElementType.definitions);
        }

        return ArrayUtils.getUniqueItems(definitions);
    }

    getIntersectionType(searchFunction: (definition: TypeDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.intersectionTypes, searchFunction);
    }

    getUnionType(searchFunction: (definition: TypeDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.unionTypes, searchFunction);
    }

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.callSignatures, searchFunction);
    }

    getDefinition(searchFunction: (definition: ModuleMemberDefinitions) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.definitions, searchFunction);
    }

    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.properties, searchFunctionOrName);
    }

    getTypeArgument(searchFunction: (typeArgument: TypeDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.typeArguments, searchFunction);
    }

    isArrayType() {
        return this.arrayElementType != null || /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }

    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition = (structure) => {
        throw new Error(`addTypeParameter is not supported on ${nameof(TypeDefinition)}`);
    };
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // ParameteredDefinition
    parameters: TypeFunctionParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: TypeFunctionParameterDefinition) => boolean)) => TypeFunctionParameterDefinition;
    addParameter: (structure: TypeFunctionParameterStructure) => TypeFunctionParameterDefinition = (structure) => {
        throw new Error(`addParameter is not supported on ${nameof(TypeDefinition)}`);
    };
}

applyMixins(TypeDefinition, BaseExpressionDefinition, [TypeParameteredDefinition, ParameteredDefinition]);
