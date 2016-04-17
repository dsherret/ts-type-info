import {TypeParameteredTestStructure, ParameteredTestStructure, ReturnTypedTestStructure} from "./../base";
import {InterfaceNewSignatureParameterTestStructure} from "./InterfaceNewSignatureParameterTestStructure";

export interface InterfaceNewSignatureTestStructure
    extends TypeParameteredTestStructure, ParameteredTestStructure<InterfaceNewSignatureParameterTestStructure>, ReturnTypedTestStructure {
}
