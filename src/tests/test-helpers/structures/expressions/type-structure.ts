import {NamedStructure, PropertyStructure, CallSignatureStructure} from "./../definitions";
import {TypeExpressionStructure} from "./type-expression-structure";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    properties?: PropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    definition?: NamedStructure;
    text: string;
}
