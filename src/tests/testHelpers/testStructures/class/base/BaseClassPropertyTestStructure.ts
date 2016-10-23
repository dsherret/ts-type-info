import {DecoratableTestStructure, BaseObjectPropertyTestStructure, JsDocedTestStructure} from "./../../base";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassPropertyTestStructure extends BaseObjectPropertyTestStructure, DecoratableTestStructure, ScopedTestStructure, JsDocedTestStructure {
}
