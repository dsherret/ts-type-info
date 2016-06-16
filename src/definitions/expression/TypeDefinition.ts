import {ModuleMemberDefinitions} from "./../../definitions";
import {ArrayUtils, DefinitionUtils} from "./../../utils";
import {DefinitionType} from "./../base";
import {CallSignatureDefinition, TypePropertyDefinition} from "./../general";
import {BaseExpressionDefinition} from "./BaseExpressionDefinition";

export class TypeDefinition extends BaseExpressionDefinition {
    arrayElementType: TypeDefinition = null;
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

    isArray() {
        return this.arrayElementType != null || /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }
}
