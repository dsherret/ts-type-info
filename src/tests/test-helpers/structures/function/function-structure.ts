import {ParameterStructure} from "./parameter-structure";
import {BaseFunctionStructure} from "./base";
import {ExportableStructure} from "./../base";

export interface FunctionStructure extends BaseFunctionStructure<ParameterStructure>, ExportableStructure {
}
