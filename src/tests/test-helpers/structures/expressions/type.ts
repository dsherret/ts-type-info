import {Named, Property} from "./../base";
import {TypeExpressionStructure} from "./type-expression";
import {CallSignature} from "./../function";

export interface Type {
    callSignatures?: CallSignature[];
    definition?: Named;
    properties?: Property[];
    typeArguments?: TypeExpressionStructure[];
    text: string;
}
