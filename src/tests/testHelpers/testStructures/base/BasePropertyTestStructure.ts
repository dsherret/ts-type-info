import {BaseTestStructure} from "./BaseTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {TypeExpressionedTestStructure} from "./TypeExpressionedTestStructure";

export interface BasePropertyTestStructure extends BaseTestStructure, NamedTestStructure, TypeExpressionedTestStructure {
    isOptional?: boolean;
}
