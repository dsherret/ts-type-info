import {BaseFunctionStructure} from "./../../function";
import {DecoratableStructure, ScopedStructure} from "./../../base";
import {ClassMethodParameterStructure} from "./../class-method-parameter-structure";

export interface BaseClassMethodStructure extends BaseFunctionStructure<ClassMethodParameterStructure>, DecoratableStructure, ScopedStructure {
}
