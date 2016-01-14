import {ExpressionStructure} from "./../expressions";
import {Named} from "./named";

export interface Decorator extends Named {
    arguments?: ExpressionStructure[];
}
