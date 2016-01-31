import {FunctionParameterStructure} from "./function-parameter-structure";
import {BaseFunctionStructure} from "./base";
import {ExportableStructure, AmbientableStructure} from "./../base";

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, ExportableStructure, AmbientableStructure {
}
