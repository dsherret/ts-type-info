import {TypeExpressionStructure} from "./../../expressions";
import {NamedStructure} from "./named-structure";

export interface TypeParameterStructure extends NamedStructure {
    constraintTypeExpression?: TypeExpressionStructure;
}
