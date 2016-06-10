import {NamedStructure} from "./NamedStructure";
import {TypedStructure} from "./TypedStructure";
import {BaseStructure} from "./BaseStructure";

export interface BasePropertyStructure extends BaseStructure, NamedStructure, TypedStructure {
    isOptional?: boolean;
}
