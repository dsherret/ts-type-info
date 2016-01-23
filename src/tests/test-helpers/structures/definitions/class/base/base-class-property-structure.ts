import {DecoratableStructure} from "./../../base";
import {ObjectPropertyStructure} from "./../../general";
import {ScopedStructure} from "./scoped-structure";

export interface BaseClassPropertyStructure extends ObjectPropertyStructure, DecoratableStructure, ScopedStructure {
}
