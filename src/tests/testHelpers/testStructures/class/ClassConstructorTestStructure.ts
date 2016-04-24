import {BaseTestStructure, ParameteredTestStructure} from "./../base";
import {ClassConstructorParameterTestStructure} from "./ClassConstructorParameterTestStructure";

export interface ClassConstructorTestStructure extends BaseTestStructure, ParameteredTestStructure<ClassConstructorParameterTestStructure> {
}
