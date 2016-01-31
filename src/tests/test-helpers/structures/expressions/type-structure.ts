import {NamedStructure, CallSignatureStructure} from "./../definitions";
import {TypeExpressionStructure} from "./type-expression-structure";
import {TypePropertyStructure} from "./../definitions";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    definition?: NamedStructure;
    text: string;
}
