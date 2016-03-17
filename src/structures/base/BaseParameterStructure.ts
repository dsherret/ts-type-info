import {NamedStructure} from "./NamedStructure";
import {TypeExpressionedStructure} from "./TypeExpressionedStructure";
import {DefaultExpressionedStructure} from "./DefaultExpressionedStructure";

export interface BaseParameterStructure extends NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}
