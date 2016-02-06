import {TypeParameteredStructure, ParameteredStructure, ReturnTypedStructure} from "./../base";
import {CallSignatureParameterStructure} from "./call-signature-parameter-structure";

export interface CallSignatureStructure extends TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
    minArgumentCount?: number;
}
