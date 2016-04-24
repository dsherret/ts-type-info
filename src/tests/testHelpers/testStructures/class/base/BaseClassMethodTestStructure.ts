import {AsyncableTestStructure, DecoratableTestStructure, BaseFunctionTestStructure, FunctionBodyWriteableTestStructure} from "./../../base";
import {BaseClassMethodParameterTestStructure} from "./BaseClassMethodParameterTestStructure";
import {ScopedTestStructure} from "./ScopedTestStructure";

export interface BaseClassMethodTestStructure<ParameterType extends BaseClassMethodParameterTestStructure>
        extends BaseFunctionTestStructure<ParameterType>, AsyncableTestStructure, DecoratableTestStructure, FunctionBodyWriteableTestStructure, ScopedTestStructure {
}
