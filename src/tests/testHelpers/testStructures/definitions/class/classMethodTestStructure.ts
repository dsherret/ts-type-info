import {AbstractableTestStructure} from "./../base";
import {BaseClassMethodTestStructure} from "./base";
import {ClassMethodParameterTestStructure} from "./ClassMethodParameterTestStructure";

export interface ClassMethodTestStructure extends BaseClassMethodTestStructure<ClassMethodParameterTestStructure>, AbstractableTestStructure {
}
