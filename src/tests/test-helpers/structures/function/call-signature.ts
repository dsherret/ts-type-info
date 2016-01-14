import {Parametered, ReturnTyped} from "./base";
import {TypeParametered} from "./../base";
import {Parameter} from "./parameter";

export interface CallSignature extends TypeParametered, Parametered<Parameter>, ReturnTyped {
    minArgumentCount?: number;
}
