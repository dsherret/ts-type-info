import {AbstractableStructure} from "./../base";
import {BaseClassMethodStructure} from "./base";
import {ClassMethodParameterStructure} from "./class-method-parameter-structure";

export interface ClassMethodStructure extends BaseClassMethodStructure<ClassMethodParameterStructure>, AbstractableStructure {
}
