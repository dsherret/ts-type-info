import {BaseParameter} from "./base-parameter";

export interface BaseFunction<T extends BaseParameter> {
    name: string;
    returnType: string;
    parameters: T[];
}
