import {NamedStructure, PropertyStructure, CallSignatureStructure} from "./../definitions";
import {TypeExpressionStructure} from "./type-expression-structure";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    definition?: NamedStructure;
    properties?: PropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    text: string;
}
