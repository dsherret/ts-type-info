import {FunctionParameterStructure} from "./FunctionParameterStructure";
import {AmbientableStructure, AsyncableStructure, ExportableStructure, BaseFunctionStructure, FunctionBodyWriteableStructure} from "./../base";

export interface FunctionStructure
    extends BaseFunctionStructure<FunctionParameterStructure>, AmbientableStructure, AsyncableStructure, ExportableStructure, FunctionBodyWriteableStructure {
}
