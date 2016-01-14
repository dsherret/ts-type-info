import {TypeExpressionStructure} from "./../expressions";
import {Named} from "./named";

export interface TypeParameter extends Named {
    constraintTypeExpression?: TypeExpressionStructure;
}
