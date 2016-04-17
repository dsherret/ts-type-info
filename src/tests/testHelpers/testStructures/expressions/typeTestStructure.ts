import {NamedTestStructure} from "./../base";
import {CallSignatureTestStructure, TypePropertyTestStructure} from "./../general";

export interface TypeTestStructure {
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    text: string;
}
