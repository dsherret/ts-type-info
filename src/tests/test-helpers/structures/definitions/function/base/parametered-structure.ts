import {ParameterStructure} from "./../parameter-structure";

export interface ParameteredStructure<T extends ParameterStructure> {
    parameters?: T[];
}
