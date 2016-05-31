import {DecoratableTestStructure, BaseObjectPropertyTestStructure} from "./../../base";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassPropertyTestStructure extends BaseObjectPropertyTestStructure, DecoratableTestStructure, ScopedTestStructure {
}
