import {ParameteredStructure, ReturnTypedStructure} from "./base";
import {TypeParameteredStructure} from "./../base";
import {ParameterStructure} from "./parameter-structure";

export interface CallSignatureStructure extends TypeParameteredStructure, ParameteredStructure<ParameterStructure>, ReturnTypedStructure {
    minArgumentCount?: number;
}
