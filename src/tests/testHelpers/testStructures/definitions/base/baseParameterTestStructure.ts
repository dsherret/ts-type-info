import {NamedTestStructure} from "./NamedTestStructure";
import {TypeExpressionedTestStructure} from "./TypeExpressionedTestStructure";
import {DefaultExpressionedTestStructure} from "./DefaultExpressionedTestStructure";

export interface BaseParameterTestStructure extends NamedTestStructure, TypeExpressionedTestStructure, DefaultExpressionedTestStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}
