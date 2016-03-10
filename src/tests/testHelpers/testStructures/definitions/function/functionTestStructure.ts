import {FunctionParameterTestStructure} from "./FunctionParameterTestStructure";
import {ExportableTestStructure, AmbientableTestStructure, BaseFunctionTestStructure} from "./../base";

export interface FunctionTestStructure extends BaseFunctionTestStructure<FunctionParameterTestStructure>, ExportableTestStructure, AmbientableTestStructure {
}
