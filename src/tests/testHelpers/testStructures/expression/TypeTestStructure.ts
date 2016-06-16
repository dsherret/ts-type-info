import {NamedTestStructure} from "./../base";
import {CallSignatureTestStructure, TypePropertyTestStructure} from "./../general";
import {BaseExpressionTestStructure} from "./BaseExpressionTestStructure";

export interface TypeTestStructure extends BaseExpressionTestStructure {
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
