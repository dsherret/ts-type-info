import {ClassConstructorParameterScope} from "./../../definitions";
import {BaseParameterStructure, ReadonlyableStructure} from "./../base";

export interface ClassConstructorParameterStructure extends BaseParameterStructure, ReadonlyableStructure {
    scope?: ClassConstructorParameterScope;
}
