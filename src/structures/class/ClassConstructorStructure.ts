import {BaseStructure, ParameteredStructure} from "./../base";
import {ClassConstructorParameterStructure} from "./ClassConstructorParameterStructure";

export interface ClassConstructorStructure extends BaseStructure, ParameteredStructure<ClassConstructorParameterStructure> {
}
