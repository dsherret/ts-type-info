import {TypeExpressionStructure} from "./../../expressions";
import {NamedStructure} from "./../base";

export interface TypeParameterStructure extends NamedStructure {
    constraintTypeExpression?: TypeExpressionStructure;
}
