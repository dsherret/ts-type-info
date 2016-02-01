import {BaseFunctionStructure} from "./../../function";
import {DecoratableStructure} from "./../../base";
import {BaseClassMethodParameterStructure} from "./base-class-method-parameter-structure";
import {ScopedStructure} from "./scoped-structure";

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure>
    extends BaseFunctionStructure<ParameterType>, DecoratableStructure, ScopedStructure {
}
