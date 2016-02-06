import {FunctionParameterStructure} from "./function-parameter-structure";
import {ExportableStructure, AmbientableStructure, BaseFunctionStructure} from "./../base";

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, ExportableStructure, AmbientableStructure {
}
