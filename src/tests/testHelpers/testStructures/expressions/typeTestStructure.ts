import {NamedTestStructure} from "./../base";
import {CallSignatureTestStructure} from "./../function";
import {TypePropertyTestStructure} from "./../general";

export interface TypeTestStructure {
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    text: string;
}
