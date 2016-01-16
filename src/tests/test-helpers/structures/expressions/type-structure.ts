import {NamedStructure, BasePropertyStructure, CallSignatureStructure} from "./../definitions";
import {TypeExpressionStructure} from "./type-expression-structure";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: BasePropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    definition?: NamedStructure;
    text: string;
}
