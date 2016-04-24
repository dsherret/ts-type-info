import {TypeExpressionTestStructure} from "./../expressions";
import {BaseTestStructure, NamedTestStructure} from "./../base";

export interface TypeParameterTestStructure extends BaseTestStructure, NamedTestStructure {
    constraintTypeExpression?: TypeExpressionTestStructure;
}
