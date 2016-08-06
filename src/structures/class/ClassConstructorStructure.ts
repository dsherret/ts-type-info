import {BaseStructure, ParameteredStructure, FunctionBodyWriteableStructure} from "./../base";
import {ScopedStructure} from "./base";
import {ClassConstructorParameterStructure} from "./ClassConstructorParameterStructure";

export interface ClassConstructorStructure
    extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure>, FunctionBodyWriteableStructure, ScopedStructure {
}
