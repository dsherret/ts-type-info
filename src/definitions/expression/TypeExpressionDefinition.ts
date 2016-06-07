import {ArrayUtils, DefinitionUtils} from "./../../utils";
import {TypeDefinition} from "./TypeDefinition";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: TypeDefinition[] = [];
    arrayElementTypeExpression: TypeExpressionDefinition = null;
    intersectionTypeExpressions: TypeExpressionDefinition[] = [];
    unionTypeExpressions: TypeExpressionDefinition[] = [];

    getType(searchFunction: (typeDefinition: TypeDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.types, searchFunction);
    }

    getDefinitions() {
        return ArrayUtils.getUniqueItems(this.types.map(t => t.definitions).reduce((a, b) => a.concat(b), []));
    }

    isArray() {
        return this.arrayElementTypeExpression != null || /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }
}
