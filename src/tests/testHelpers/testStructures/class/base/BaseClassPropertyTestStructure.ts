import {DecoratableTestStructure, BaseObjectPropertyTestStructure, DocumentationedTestStructure} from "./../../base";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassPropertyTestStructure extends BaseObjectPropertyTestStructure, DecoratableTestStructure, ScopedTestStructure, DocumentationedTestStructure {
}
