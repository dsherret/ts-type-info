import {BaseTestStructure, NamedTestStructure} from "./../base";
import {ExpressionTestStructure} from "./../expression";

export interface DecoratorTestStructure extends BaseTestStructure, NamedTestStructure {
    isDecoratorFactory?: boolean;
    arguments?: ExpressionTestStructure[];
}
