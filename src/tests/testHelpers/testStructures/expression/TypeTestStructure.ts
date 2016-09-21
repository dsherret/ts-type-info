import {NamedTestStructure, TypeParameteredTestStructure, ParameteredTestStructure} from "./../base";
import {CallSignatureTestStructure, TypePropertyTestStructure} from "./../general";
import {BaseExpressionTestStructure} from "./BaseExpressionTestStructure";
import {TypeFunctionParameterTestStructure} from "./TypeFunctionParameterTestStructure";

export interface TypeTestStructure extends BaseExpressionTestStructure, TypeParameteredTestStructure, ParameteredTestStructure<TypeFunctionParameterTestStructure> {
    arrayElementType?: TypeTestStructure;
    intersectionTypes?: TypeTestStructure[];
    unionTypes?: TypeTestStructure[];
    isArrayType?: boolean;
    callSignatures?: CallSignatureTestStructure[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: TypeTestStructure[];
    definitions?: NamedTestStructure[];
    allDefinitions?: NamedTestStructure[];
}
