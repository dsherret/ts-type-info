import {NamedStructure} from "./NamedStructure";
import {TypeExpressionedStructure} from "./TypeExpressionedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BasePropertyStructure extends BaseStructure, NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}
