import {BaseFunction} from "./../../function";
import {Decoratable, Scoped} from "./../../base";
import {ClassMethodParameter} from "./../class-method-parameter";

export interface BaseClassMethod extends BaseFunction<ClassMethodParameter>, Decoratable, Scoped {
}
