import {Function} from "./../function/function";
import {Scope} from "./../../../../scope";

export interface ClassMethod extends Function {
    scope: Scope;
}
