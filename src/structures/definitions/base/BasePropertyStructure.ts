import {NamedStructure} from "./NamedStructure";
import {TypeExpressionedStructure} from "./TypeExpressionedStructure";

export interface BasePropertyStructure extends NamedStructure, TypeExpressionedStructure {
    isOptional?: boolean;
}
