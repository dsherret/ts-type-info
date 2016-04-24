import {FunctionParameterStructure} from "./FunctionParameterStructure";
import {ExportableStructure, AmbientableStructure, BaseFunctionStructure, FunctionBodyWriteableStructure} from "./../base";

export interface FunctionStructure extends BaseFunctionStructure<FunctionParameterStructure>, ExportableStructure, AmbientableStructure, FunctionBodyWriteableStructure {
}
