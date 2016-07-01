import {BaseTestStructure} from "./BaseTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {OptionalTestStructure} from "./OptionalTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";

export interface BasePropertyTestStructure extends BaseTestStructure, NamedTestStructure, OptionalTestStructure, TypedTestStructure {
}
