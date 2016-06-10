import {NamedTestStructure} from "./../base";
import {CallSignatureTestStructure, TypePropertyTestStructure} from "./../general";

export interface TypeExpressionTestStructure {
    text: string;
    arrayElementTypeExpression?: TypeExpressionTestStructure;
    intersectionTypeExpressions?: TypeExpressionTestStructure[];
    unionTypeExpressions?: TypeExpressionTestStructure[];
    isArray?: boolean;
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeExpressionTestStructure[];
    definitions?: NamedTestStructure[];
}
