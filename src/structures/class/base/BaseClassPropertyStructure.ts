import {DecoratableStructure, BaseObjectPropertyStructure, DocumentationedStructure} from "./../../base";
import {ScopedStructure} from "./ScopedStructure";

export interface BaseClassPropertyStructure extends BaseObjectPropertyStructure, DecoratableStructure, ScopedStructure, DocumentationedStructure {
}
