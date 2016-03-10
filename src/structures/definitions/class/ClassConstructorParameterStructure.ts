import {ClassConstructorParameterScope} from "./../../../definitions";
import {BaseParameterStructure} from "./../base";

export interface ClassConstructorParameterStructure extends BaseParameterStructure {
    scope?: ClassConstructorParameterScope;
}
