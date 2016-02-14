import {NamedStructure, CallSignatureStructure, TypePropertyStructure} from "./../definitions";
import {TypeExpressionStructure} from "./type-expression-structure";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: TypePropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    definitions?: NamedStructure[];
    text: string;
}
