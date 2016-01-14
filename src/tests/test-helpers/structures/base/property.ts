import {Named} from "./named";
import {TypeExpressionedStructure} from "./type-expressioned";

export interface Property extends Named, TypeExpressionedStructure {
    isOptional?: boolean;
}
