import {BaseParameterStructure} from "./base-parameter-structure";

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[];
}
