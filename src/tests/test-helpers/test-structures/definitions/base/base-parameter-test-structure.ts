import {NamedTestStructure} from "./named-test-structure";
import {TypeExpressionedTestStructure} from "./type-expressioned-test-structure";
import {DefaultExpressionedTestStructure} from "./default-expressioned-test-structure";

export interface BaseParameterTestStructure extends NamedTestStructure, TypeExpressionedTestStructure, DefaultExpressionedTestStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}
