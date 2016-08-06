import {BaseTestStructure, FunctionBodyWriteableTestStructure, ParameteredTestStructure} from "./../base";
import {ScopedTestStructure} from "./base";
import {ClassConstructorParameterTestStructure} from "./ClassConstructorParameterTestStructure";

export interface ClassConstructorTestStructure
    extends BaseTestStructure, FunctionBodyWriteableTestStructure, ParameteredTestStructure<ClassConstructorParameterTestStructure>, ScopedTestStructure {
}
