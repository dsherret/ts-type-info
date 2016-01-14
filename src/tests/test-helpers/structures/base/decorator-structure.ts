import {ExpressionStructure} from "./../expressions";
import {NamedStructure} from "./named-structure";

export interface DecoratorStructure extends NamedStructure {
    arguments?: ExpressionStructure[];
}
