import {NamedStructure, TypeExpressionedStructure} from "./../../base";
import {ExpressionStructure} from "./../../../expressions";

export interface BaseParameterStructure extends NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    defaultExpression?: ExpressionStructure;
}
