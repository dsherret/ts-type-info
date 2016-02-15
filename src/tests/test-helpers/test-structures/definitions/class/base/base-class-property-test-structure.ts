import {DecoratableTestStructure, ObjectPropertyTestStructure} from "./../../base";
import {ScopedTestStructure} from "./scoped-test-structure";

export interface BaseClassPropertyTestStructure extends ObjectPropertyTestStructure, DecoratableTestStructure, ScopedTestStructure {
}
