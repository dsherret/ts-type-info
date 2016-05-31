import {ObjectPropertyStructure} from "./../general/ObjectPropertyStructure";
import {NamedStructure} from "./NamedStructure";
import {TypeExpressionedStructure} from "./TypeExpressionedStructure";
import {DefaultExpressionedStructure} from "./DefaultExpressionedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BaseParameterStructure extends BaseStructure, NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyStructure[];
}
