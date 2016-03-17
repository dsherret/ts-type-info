import {NamedStructure} from "./../base";
import {CallSignatureStructure} from "./../function";
import {TypePropertyStructure} from "./../general";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: string[];
    definitions?: NamedStructure[];
    text: string;
}
