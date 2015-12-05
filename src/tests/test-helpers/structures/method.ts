import {Parameter} from "./parameter";
import {Scope} from "./../../../scope";

export interface Method {
    name: string;
    returnType: string;
    scope: Scope;
    parameters: Parameter[];
}
