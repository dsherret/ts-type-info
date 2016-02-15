import {NamedTestStructure} from "./named-test-structure";
import {TypeExpressionedTestStructure} from "./type-expressioned-test-structure";

export interface BasePropertyTestStructure extends NamedTestStructure, TypeExpressionedTestStructure {
    isOptional?: boolean;
}
