import {BaseParameterTestStructure} from "./base-parameter-test-structure";

export interface ParameteredTestStructure<T extends BaseParameterTestStructure> {
    parameters?: T[];
}
