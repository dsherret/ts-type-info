import {Parameter} from "./../parameter";

export interface Parametered<T extends Parameter> {
    parameters?: T[];
}
