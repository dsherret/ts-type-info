import {TypeParameteredTestStructure, ParameteredTestStructure, ReturnTypedTestStructure} from "./../base";
import {CallSignatureParameterTestStructure} from "./call-signature-parameter-test-structure";

export interface CallSignatureTestStructure extends TypeParameteredTestStructure, ParameteredTestStructure<CallSignatureParameterTestStructure>, ReturnTypedTestStructure {
    minArgumentCount?: number;
}
