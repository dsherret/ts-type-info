import {ModuleMemberDefinitions} from "./../../definitions";
import {DefinitionUtils} from "./../../utils";
import {CallSignatureDefinition, TypePropertyDefinition} from "./../general";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeDefinition extends ExpressionDefinition {
    arrayElementType: TypeDefinition = null;
    intersectionTypes: TypeDefinition[] = [];
    unionTypes: TypeDefinition[] = [];
    callSignatures: CallSignatureDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeDefinition[] = [];
    text: string;

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

    isArray() {
        return this.arrayElementType != null || /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }
}
