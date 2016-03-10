import {ExpressionTestStructure} from "./../../expressions";
import {NamedTestStructure} from "./../base";

export interface DecoratorTestStructure extends NamedTestStructure {
    arguments?: ExpressionTestStructure[];
}
