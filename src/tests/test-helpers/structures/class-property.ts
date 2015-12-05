import {Property} from "./property";
import {Scope} from "./../../../scope";

export interface ClassProperty extends Property {
    scope: Scope;
}