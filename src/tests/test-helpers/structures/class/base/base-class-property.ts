import {Property} from "./../../property";
import {Scope} from "./../../../../../scope";

export interface BaseClassProperty extends Property {
    scope: Scope;
}
