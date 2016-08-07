import {ClassConstructorParameterScope} from "./../../../../definitions";
import {BaseParameterTestStructure, ReadonlyableTestStructure} from "./../base";

export interface ClassConstructorParameterTestStructure extends BaseParameterTestStructure, ReadonlyableTestStructure {
    scope?: ClassConstructorParameterScope;
}
