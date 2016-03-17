import {TsTypeExpression} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {Type} from "./TypeDefinition";
import {ExpressionDefinition} from "./ExpressionDefinition";

export class TypeExpression extends ExpressionDefinition {
    types = new ArrayExt<Type>();

    addType(type: Type) {
        this.types.push(type);
    }
}
