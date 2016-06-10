import {BaseTestStructure} from "./BaseTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";

export interface BasePropertyTestStructure extends BaseTestStructure, NamedTestStructure, TypedTestStructure {
    isOptional?: boolean;
}
