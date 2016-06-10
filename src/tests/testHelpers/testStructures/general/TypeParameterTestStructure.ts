import {TypeTestStructure} from "./../expression";
import {BaseTestStructure, NamedTestStructure} from "./../base";

export interface TypeParameterTestStructure extends BaseTestStructure, NamedTestStructure {
    constraintType?: TypeTestStructure;
}
