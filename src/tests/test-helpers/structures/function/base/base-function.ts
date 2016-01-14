import {BaseParameter} from "./base-parameter";
import {Named, TypeParametered} from "./../../base";
import {Parametered} from "./parametered";
import {ReturnTyped} from "./return-typed";

export interface BaseFunction<T extends BaseParameter> extends Named, TypeParametered, Parametered<T>, ReturnTyped {
}
