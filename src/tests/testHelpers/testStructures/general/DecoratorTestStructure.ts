import {BaseTestStructure, NamedTestStructure} from "./../base";
import {ExpressionTestStructure} from "./../expressions";

export interface DecoratorTestStructure extends BaseTestStructure, NamedTestStructure {
    arguments?: ExpressionTestStructure[];
}
