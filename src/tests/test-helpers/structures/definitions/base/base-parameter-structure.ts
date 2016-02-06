import {NamedStructure} from "./named-structure";
import {TypeExpressionedStructure} from "./type-expressioned-structure";
import {DefaultExpressionedStructure} from "./default-expressioned-structure";

export interface BaseParameterStructure extends NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}
