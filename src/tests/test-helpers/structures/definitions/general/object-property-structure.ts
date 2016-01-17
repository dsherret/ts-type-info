import {ExpressionStructure} from "./../../expressions";
import {BasePropertyStructure} from "./../base";

export interface ObjectPropertyStructure extends BasePropertyStructure {
    defaultExpression?: ExpressionStructure;
}
