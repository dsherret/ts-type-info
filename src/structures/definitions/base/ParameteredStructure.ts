import {BaseParameterStructure} from "./BaseParameterStructure";

export interface ParameteredStructure<T extends BaseParameterStructure> {
    parameters?: T[];
}
