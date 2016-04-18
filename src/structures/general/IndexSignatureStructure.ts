import {ReturnTypedStructure} from "./../base";

export interface IndexSignatureStructure extends ReturnTypedStructure {
    keyName: string;
    keyType?: string;
    returnType: string; // make it required (from ReturnTypedStructure)
}
