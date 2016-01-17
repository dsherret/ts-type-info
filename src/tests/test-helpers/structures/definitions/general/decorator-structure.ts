import {ExpressionStructure} from "./../../expressions";
import {NamedStructure} from "./../base";

export interface DecoratorStructure extends NamedStructure {
    arguments?: ExpressionStructure[];
}
