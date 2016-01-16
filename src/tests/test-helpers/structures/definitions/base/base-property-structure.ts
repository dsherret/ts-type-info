import {NamedStructure} from "./named-structure";
import {TypeExpressionedStructure} from "./type-expressioned-structure";

export interface BasePropertyStructure extends NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}
