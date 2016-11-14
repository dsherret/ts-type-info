import {BaseTestStructure, TypeParameteredTestStructure, ParameteredTestStructure, ReturnTypedTestStructure, DocumentationedTestStructure} from "./../base";
import {CallSignatureParameterTestStructure} from "./CallSignatureParameterTestStructure";

export interface CallSignatureTestStructure
        extends BaseTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<CallSignatureParameterTestStructure>, ReturnTypedTestStructure, DocumentationedTestStructure {
    minArgumentCount?: number;
}
