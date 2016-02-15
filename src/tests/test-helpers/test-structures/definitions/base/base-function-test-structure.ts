import {BaseParameterTestStructure} from "./base-parameter-test-structure";
import {NamedTestStructure} from "./named-test-structure";
import {TypeParameteredTestStructure} from "./type-parametered-test-structure";
import {ParameteredTestStructure} from "./parametered-test-structure";
import {ReturnTypedTestStructure} from "./return-typed-test-structure";

export interface BaseFunctionTestStructure<T extends BaseParameterTestStructure> extends NamedTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<T>, ReturnTypedTestStructure {
}
