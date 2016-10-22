import {BaseTestStructure, FunctionBodyWriteableTestStructure, ParameteredTestStructure, OverloadSignaturedTestStructure, JsDocedTestStructure} from "./../base";
import {ScopedTestStructure} from "./base";
import {ClassConstructorParameterTestStructure} from "./ClassConstructorParameterTestStructure";

export interface ClassConstructorTestStructure
    extends BaseTestStructure, FunctionBodyWriteableTestStructure, ParameteredTestStructure<ClassConstructorParameterTestStructure>, ScopedTestStructure,
        OverloadSignaturedTestStructure, JsDocedTestStructure {
}
