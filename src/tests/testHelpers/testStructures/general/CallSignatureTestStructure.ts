import {BaseTestStructure, TypeParameteredTestStructure, ParameteredTestStructure, ReturnTypedTestStructure} from "./../base";
import {CallSignatureParameterTestStructure} from "./CallSignatureParameterTestStructure";

export interface CallSignatureTestStructure
        extends BaseTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<CallSignatureParameterTestStructure>, ReturnTypedTestStructure {
    minArgumentCount?: number;
}
