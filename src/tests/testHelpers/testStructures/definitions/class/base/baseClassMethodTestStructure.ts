import {DecoratableTestStructure, BaseFunctionTestStructure} from "./../../base";
import {BaseClassMethodParameterTestStructure} from "./BaseClassMethodParameterTestStructure";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassMethodTestStructure<ParameterType extends BaseClassMethodParameterTestStructure>
    extends BaseFunctionTestStructure<ParameterType>, DecoratableTestStructure, ScopedTestStructure {
}
