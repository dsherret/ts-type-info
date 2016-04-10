import {BaseParameterTestStructure} from "./BaseParameterTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {TypeParameteredTestStructure} from "./TypeParameteredTestStructure";
import {ParameteredTestStructure} from "./ParameteredTestStructure";
import {ReturnTypedTestStructure} from "./ReturnTypedTestStructure";

export interface BaseFunctionTestStructure<T extends BaseParameterTestStructure>
        extends NamedTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<T>, ReturnTypedTestStructure {
}
