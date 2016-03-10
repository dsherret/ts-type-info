import {TypeParameteredTestStructure, ParameteredTestStructure, ReturnTypedTestStructure} from "./../base";
import {CallSignatureParameterTestStructure} from "./CallSignatureParameterTestStructure";

export interface CallSignatureTestStructure extends TypeParameteredTestStructure, ParameteredTestStructure<CallSignatureParameterTestStructure>, ReturnTypedTestStructure {
    minArgumentCount?: number;
}
