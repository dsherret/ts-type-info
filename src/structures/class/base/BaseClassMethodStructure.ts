import {DecoratableStructure, BaseFunctionStructure} from "./../../base";
import {BaseClassMethodParameterStructure} from "./BaseClassMethodParameterStructure";
import {ScopedStructure} from "./ScopedStructure";

export interface BaseClassMethodStructure<ParameterType extends BaseClassMethodParameterStructure>
    extends BaseFunctionStructure<ParameterType>, DecoratableStructure, ScopedStructure {
}
