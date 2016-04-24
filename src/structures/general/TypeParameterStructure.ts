import {BaseStructure, NamedStructure} from "./../base";

export interface TypeParameterStructure extends BaseStructure, NamedStructure {
    constraintType?: string;
}
