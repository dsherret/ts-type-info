import {FunctionParameterTestStructure} from "./FunctionParameterTestStructure";
import {AsyncableTestStructure, ExportableTestStructure, AmbientableTestStructure, BaseFunctionTestStructure, FunctionBodyWriteableTestStructure,
    OrderableTestStructure} from "./../base";

export interface FunctionTestStructure
        extends BaseFunctionTestStructure<FunctionParameterTestStructure>, AsyncableTestStructure, ExportableTestStructure, FunctionBodyWriteableTestStructure,
            AmbientableTestStructure, OrderableTestStructure {
}
