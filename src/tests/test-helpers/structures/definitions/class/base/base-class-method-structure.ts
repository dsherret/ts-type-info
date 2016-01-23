import {BaseFunctionStructure} from "./../../function";
import {DecoratableStructure} from "./../../base";
import {ClassMethodParameterStructure} from "./../class-method-parameter-structure";
import {ScopedStructure} from "./scoped-structure";

export interface BaseClassMethodStructure extends BaseFunctionStructure<ClassMethodParameterStructure>, DecoratableStructure, ScopedStructure {
}
