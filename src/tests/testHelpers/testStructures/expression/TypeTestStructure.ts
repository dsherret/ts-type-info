import {CallSignatureTestStructure} from "./../general";
import {BaseTypeTestStructure} from "./base";
import {TypeNodeTestStructure} from "./TypeNodeTestStructure";

export interface TypeTestStructure extends BaseTypeTestStructure {
    callSignatures?: CallSignatureTestStructure[];
    node?: TypeNodeTestStructure;
}
