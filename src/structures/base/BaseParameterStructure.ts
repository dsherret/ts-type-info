import {ObjectPropertyStructure} from "./../general/ObjectPropertyStructure";
import {NamedStructure} from "./NamedStructure";
import {TypedStructure} from "./TypedStructure";
import {DefaultExpressionedStructure} from "./DefaultExpressionedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BaseParameterStructure extends BaseStructure, NamedStructure, TypedStructure, DefaultExpressionedStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyStructure[];
}
