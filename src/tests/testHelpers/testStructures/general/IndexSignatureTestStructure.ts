import {BaseTestStructure, ReturnTypedTestStructure} from "./../base";
import {TypeTestStructure} from "./../expression";

export interface IndexSignatureTestStructure extends BaseTestStructure, ReturnTypedTestStructure {
    keyName: string;
    keyType: TypeTestStructure;
}
