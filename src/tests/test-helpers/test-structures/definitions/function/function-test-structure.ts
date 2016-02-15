import {FunctionParameterTestStructure} from "./function-parameter-test-structure";
import {ExportableTestStructure, AmbientableTestStructure, BaseFunctionTestStructure} from "./../base";

export interface FunctionTestStructure extends BaseFunctionTestStructure<FunctionParameterTestStructure>, ExportableTestStructure, AmbientableTestStructure {
}
