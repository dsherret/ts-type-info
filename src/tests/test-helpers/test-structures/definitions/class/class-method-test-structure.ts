import {AbstractableTestStructure} from "./../base";
import {BaseClassMethodTestStructure} from "./base";
import {ClassMethodParameterTestStructure} from "./class-method-parameter-test-structure";

export interface ClassMethodTestStructure extends BaseClassMethodTestStructure<ClassMethodParameterTestStructure>, AbstractableTestStructure {
}
