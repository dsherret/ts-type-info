import {BaseStructure, ReturnTypedStructure, ReadonlyableStructure} from "./../base";

export interface IndexSignatureStructure extends BaseStructure, ReturnTypedStructure, ReadonlyableStructure {
    keyName: string;
    keyType?: string;
    returnType: string; // make it required (from ReturnTypedStructure)
}
