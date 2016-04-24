import {BaseStructure, ParameteredStructure, FunctionBodyWriteableStructure} from "./../base";
import {ClassConstructorParameterStructure} from "./ClassConstructorParameterStructure";

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure {
}
