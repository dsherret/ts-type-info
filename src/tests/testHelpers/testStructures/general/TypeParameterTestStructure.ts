import {TypeExpressionTestStructure} from "./../expressions";
import {NamedTestStructure} from "./../base";

export interface TypeParameterTestStructure extends NamedTestStructure {
    constraintTypeExpression?: TypeExpressionTestStructure;
}
