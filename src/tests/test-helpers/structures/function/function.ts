import {Parameter} from "./parameter";

export interface Function {
    name: string;
    returnType: string;
    parameters: Parameter[];
    isExported?: boolean;
}
