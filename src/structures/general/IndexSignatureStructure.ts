import {BaseStructure, ReturnTypedStructure} from "./../base";

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure {
    keyName: string;
    keyType?: string;
    returnType: string; // make it required (from ReturnTypedStructure)
}
