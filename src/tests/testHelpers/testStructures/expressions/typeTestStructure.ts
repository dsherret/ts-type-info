import {NamedTestStructure, CallSignatureTestStructure, TypePropertyTestStructure} from "./../definitions";

export interface TypeTestStructure {
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    text: string;
}
