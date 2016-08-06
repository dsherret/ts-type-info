import {BaseParameterTestStructure} from "./BaseParameterTestStructure";
import {ThisTypedTestStructure} from "./ThisTypedTestStructure";

export interface ParameteredTestStructure<T extends BaseParameterTestStructure> extends ThisTypedTestStructure {
    parameters?: T[];
}
