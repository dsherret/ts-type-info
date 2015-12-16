import {Parameter} from "./parameter";
import {BaseFunction} from "./base";

export interface Function extends BaseFunction<Parameter> {
    isExported?: boolean;
}
