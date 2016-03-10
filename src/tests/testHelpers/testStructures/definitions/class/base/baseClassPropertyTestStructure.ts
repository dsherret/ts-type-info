import {DecoratableTestStructure, ObjectPropertyTestStructure} from "./../../base";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassPropertyTestStructure extends ObjectPropertyTestStructure, DecoratableTestStructure, ScopedTestStructure {
}
