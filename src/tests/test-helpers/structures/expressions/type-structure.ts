import {NamedStructure, PropertyStructure} from "./../base";
import {CallSignatureStructure} from "./../function";
import {TypeExpressionStructure} from "./type-expression-structure";

export interface TypeStructure {
    callSignatures?: CallSignatureStructure[];
    definition?: NamedStructure;
    properties?: PropertyStructure[];
    typeArguments?: TypeExpressionStructure[];
    text: string;
}
