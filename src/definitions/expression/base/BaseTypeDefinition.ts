import {ModuleMemberDefinitions} from "./../../../definitions";
import {ArrayUtils, DefinitionUtils} from "./../../../utils";
import {TypePropertyDefinition} from "./../../general";
import {BaseExpressionDefinition} from "./BaseExpressionDefinition";
import {TypeDefinition} from "./../TypeDefinition";

export abstract class BaseTypeDefinition extends BaseExpressionDefinition {
    arrayElementType: TypeDefinition | null = null;
    intersectionTypes: TypeDefinition[] = [];
    unionTypes: TypeDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeDefinition[] = [];
    text: string;

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
}
