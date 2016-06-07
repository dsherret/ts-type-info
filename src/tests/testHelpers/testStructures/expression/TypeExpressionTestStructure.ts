import {TypeTestStructure} from "./TypeTestStructure";

export interface TypeExpressionTestStructure {
    text: string;
    types?: TypeTestStructure[];
    arrayElementTypeExpression?: TypeExpressionTestStructure;
    intersectionTypeExpressions?: TypeExpressionTestStructure[];
    unionTypeExpressions?: TypeExpressionTestStructure[];
    isArray?: boolean;
}
