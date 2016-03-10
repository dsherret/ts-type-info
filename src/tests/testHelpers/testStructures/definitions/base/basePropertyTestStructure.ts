import {NamedTestStructure} from "./NamedTestStructure";
import {TypeExpressionedTestStructure} from "./TypeExpressionedTestStructure";

export interface BasePropertyTestStructure extends NamedTestStructure, TypeExpressionedTestStructure {
    isOptional?: boolean;
}
