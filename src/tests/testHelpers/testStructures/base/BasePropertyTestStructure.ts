import {BaseTestStructure} from "./BaseTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {OptionalTestStructure} from "./OptionalTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";
import {ReadonlyableTestStructure} from "./ReadonlyableTestStructure";

export interface BasePropertyTestStructure extends BaseTestStructure, NamedTestStructure, OptionalTestStructure, TypedTestStructure, ReadonlyableTestStructure {
}
