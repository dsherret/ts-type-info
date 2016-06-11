import {NamedTestStructure} from "./../base";
import {CallSignatureTestStructure, TypePropertyTestStructure} from "./../general";

export interface TypeTestStructure {
    text: string;
    arrayElementType?: TypeTestStructure;
    intersectionTypes?: TypeTestStructure[];
    unionTypes?: TypeTestStructure[];
    isArray?: boolean;
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    allDefinitions?: NamedTestStructure[];
}
