import {DecoratableStructure, BaseObjectPropertyStructure, JsDocedStructure} from "./../../base";
import {ScopedStructure} from "./ScopedStructure";

export interface BaseClassPropertyStructure extends BaseObjectPropertyStructure, DecoratableStructure, ScopedStructure, JsDocedStructure {
}
