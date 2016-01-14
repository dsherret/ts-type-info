import {NamedStructure} from "./named-structure";
import {TypeExpressionedStructure} from "./type-expressioned-structure";

export interface PropertyStructure extends NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}
