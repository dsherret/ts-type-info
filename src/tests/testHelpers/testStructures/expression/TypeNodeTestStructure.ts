import {TypeParameteredTestStructure, ParameteredTestStructure} from "./../base";
import {BaseTypeTestStructure} from "./base";
import {TypeFunctionParameterTestStructure} from "./TypeFunctionParameterTestStructure";

export interface TypeNodeTestStructure extends BaseTypeTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<TypeFunctionParameterTestStructure> {
}
