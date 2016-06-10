import {ModuleMemberDefinitions} from "./../../definitions";
import {DefinitionUtils} from "./../../utils";
import {CallSignatureDefinition, TypePropertyDefinition} from "./../general";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpressionDefinition extends ExpressionDefinition {
    arrayElementTypeExpression: TypeExpressionDefinition = null;
    intersectionTypeExpressions: TypeExpressionDefinition[] = [];
    unionTypeExpressions: TypeExpressionDefinition[] = [];
    callSignatures: CallSignatureDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeExpressionDefinition[] = [];
    text: string;

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.callSignatures, searchFunction);
    }

    getDefinition(searchFunction: (definition: ModuleMemberDefinitions) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.definitions, searchFunction);
    }

    getProperty(searchFunctionOrName: string | ((property: TypePropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.properties, searchFunctionOrName);
    }

    getTypeArgument(searchFunction: (typeArgument: TypeExpressionDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.typeArguments, searchFunction);
    }

    isArray() {
        return this.arrayElementTypeExpression != null || /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }
}
