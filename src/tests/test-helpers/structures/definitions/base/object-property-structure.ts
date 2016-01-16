import {ExpressionStructure} from "./../../expressions";
import {BasePropertyStructure} from "./base-property-structure";

export interface ObjectPropertyStructure extends BasePropertyStructure {
    defaultExpression?: ExpressionStructure;
}
