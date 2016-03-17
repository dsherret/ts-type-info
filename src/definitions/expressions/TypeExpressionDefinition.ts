import {TsTypeExpression} from "./../../compiler"
import {ArrayExt} from "./../../utils";
import {TypeDefinition} from "./TypeDefinition";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpressionDefinition extends ExpressionDefinition {
    types = new ArrayExt<TypeDefinition>();

    addType(type: TypeDefinition) {
        this.types.push(type);
    }
}
