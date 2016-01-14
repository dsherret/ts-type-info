import {Parameter} from "./parameter";
import {BaseFunction} from "./base";
import {Exportable} from "./../base";

export interface Function extends BaseFunction<Parameter>, Exportable {
}
