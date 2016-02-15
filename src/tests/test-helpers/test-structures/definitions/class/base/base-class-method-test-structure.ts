import {DecoratableTestStructure, BaseFunctionTestStructure} from "./../../base";
import {BaseClassMethodParameterTestStructure} from "./base-class-method-parameter-test-structure";
import {ScopedTestStructure} from "./scoped-test-structure";

export interface BaseClassMethodTestStructure<ParameterType extends BaseClassMethodParameterTestStructure>
    extends BaseFunctionTestStructure<ParameterType>, DecoratableTestStructure, ScopedTestStructure {
}
