import {BaseStructure, TypeParameteredStructure, ParameteredStructure, ReturnTypedStructure, DocumentationedStructure} from "./../base";
import {CallSignatureParameterStructure} from "./CallSignatureParameterStructure";

export interface CallSignatureStructure
    extends BaseStructure, TypeParameteredStructure, ParameteredStructure<CallSignatureParameterStructure>, ReturnTypedStructure, DocumentationedStructure {
}
