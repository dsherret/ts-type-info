import {NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure} from "./../../base";

export interface BaseParameterStructure extends NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
}
