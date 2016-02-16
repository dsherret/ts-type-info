import {NamedStructure, CallSignatureStructure, TypePropertyStructure} from "./../definitions";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
}
