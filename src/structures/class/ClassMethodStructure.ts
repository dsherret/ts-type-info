import {AbstractableStructure} from "./../base";
import {BaseClassMethodStructure} from "./base";
import {ClassMethodParameterStructure} from "./ClassMethodParameterStructure";

export interface ClassMethodStructure extends BaseClassMethodStructure<ClassMethodParameterStructure>, AbstractableStructure {
}
