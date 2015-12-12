import {Function} from "./../../function";
import {Scope} from "./../../../../../scope";

export interface BaseClassMethod extends Function {
    scope: Scope;
}
