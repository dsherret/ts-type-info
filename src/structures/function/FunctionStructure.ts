import {FunctionParameterStructure} from "./FunctionParameterStructure";
import {ExportableStructure, AmbientableStructure, BaseFunctionStructure} from "./../base";

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, ExportableStructure, AmbientableStructure {
}
