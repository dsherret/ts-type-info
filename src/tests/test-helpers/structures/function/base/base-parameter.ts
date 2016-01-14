import {Named, TypeExpressionedStructure} from "./../../base";
import {ExpressionStructure} from "./../../expressions";

export interface BaseParameter extends Named, TypeExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    defaultExpression?: ExpressionStructure;
}
