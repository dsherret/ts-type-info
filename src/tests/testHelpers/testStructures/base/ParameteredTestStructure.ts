import {BaseParameterTestStructure} from "./BaseParameterTestStructure";

export interface ParameteredTestStructure<T extends BaseParameterTestStructure> {
    parameters?: T[];
}
