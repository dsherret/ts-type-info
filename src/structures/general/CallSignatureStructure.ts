import {TypeParameteredStructure, ParameteredStructure, ReturnTypedStructure} from "./../base";
import {CallSignatureParameterStructure} from "./CallSignatureParameterStructure";

export interface CallSignatureStructure extends TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure {
}
