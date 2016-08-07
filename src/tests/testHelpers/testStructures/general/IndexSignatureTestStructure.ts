import {BaseTestStructure, ReturnTypedTestStructure, ReadonlyableTestStructure} from "./../base";
import {TypeTestStructure} from "./../expression";

export interface IndexSignatureTestStructure extends BaseTestStructure, ReturnTypedTestStructure, ReadonlyableTestStructure {
    keyName: string;
    keyType: TypeTestStructure;
}
