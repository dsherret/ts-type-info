import {NamedTestStructure, TypeParameteredTestStructure} from "./../../base";
import {TypePropertyTestStructure} from "./../../general";
import {BaseExpressionTestStructure} from "./BaseExpressionTestStructure";

export interface BaseTypeTestStructure extends BaseExpressionTestStructure, TypeParameteredTestStructure {
    arrayElementType?: this;
    isArrayType?: boolean;
    intersectionTypes?: this[];
    unionTypes?: this[];
    properties?: TypePropertyTestStructure[];
    typeArguments?: this[];
    definitions?: NamedTestStructure[];
    allDefinitions?: NamedTestStructure[];
}
