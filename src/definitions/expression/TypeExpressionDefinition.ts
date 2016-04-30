import {DefinitionUtils} from "./../../utils";
import {TypeDefinition} from "./TypeDefinition";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: TypeDefinition[] = [];

    getType(searchFunction: (typeDefinition: TypeDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.types, searchFunction);
    }
}
