import {ObjectPropertyStructure} from "./../general/ObjectPropertyStructure";
import {OptionallyNamedStructure} from "./OptionallyNamedStructure";
import {OptionalStructure} from "./OptionalStructure";
import {TypedStructure} from "./TypedStructure";
import {DefaultExpressionedStructure} from "./DefaultExpressionedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BaseParameterStructure extends BaseStructure, OptionallyNamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyStructure[];
}
