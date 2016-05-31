import {ObjectPropertyTestStructure} from "./../general/ObjectPropertyTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {BaseTestStructure} from "./BaseTestStructure";
import {TypeExpressionedTestStructure} from "./TypeExpressionedTestStructure";
import {DefaultExpressionedTestStructure} from "./DefaultExpressionedTestStructure";

export interface BaseParameterTestStructure extends BaseTestStructure, NamedTestStructure, TypeExpressionedTestStructure, DefaultExpressionedTestStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyTestStructure[];
}
