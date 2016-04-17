import {NamedStructure} from "./../base";
import {CallSignatureStructure, TypePropertyStructure} from "./../general";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
}
