import {TypeDefinition} from "./TypeDefinition";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpressionDefinition extends ExpressionDefinition {
    types: TypeDefinition[] = [];

    addType(type: TypeDefinition) {
        this.types.push(type);
    }
}
