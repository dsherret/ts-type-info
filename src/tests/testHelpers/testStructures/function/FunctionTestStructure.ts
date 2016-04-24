import {FunctionParameterTestStructure} from "./FunctionParameterTestStructure";
import {ExportableTestStructure, AmbientableTestStructure, BaseFunctionTestStructure, FunctionBodyWriteableTestStructure} from "./../base";

export interface FunctionTestStructure
        extends BaseFunctionTestStructure<FunctionParameterTestStructure>, ExportableTestStructure, FunctionBodyWriteableTestStructure, AmbientableTestStructure {
}
