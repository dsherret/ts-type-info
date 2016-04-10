import {ClassConstructorParameterScope} from "./../../../../definitions";
import {BaseParameterTestStructure} from "./../base";

export interface ClassConstructorParameterTestStructure extends BaseParameterTestStructure {
    scope?: ClassConstructorParameterScope;
}
