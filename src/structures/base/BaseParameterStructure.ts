import {ObjectPropertyStructure} from "./../general/ObjectPropertyStructure";
import {NamedStructure} from "./NamedStructure";
import {OptionalStructure} from "./OptionalStructure";
import {TypedStructure} from "./TypedStructure";
import {DefaultExpressionedStructure} from "./DefaultExpressionedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BaseParameterStructure extends BaseStructure, NamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyStructure[];
}
