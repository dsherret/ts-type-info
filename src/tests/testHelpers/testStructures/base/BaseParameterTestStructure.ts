import {ObjectPropertyTestStructure} from "./../general/ObjectPropertyTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {BaseTestStructure} from "./BaseTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";
import {DefaultExpressionedTestStructure} from "./DefaultExpressionedTestStructure";

export interface BaseParameterTestStructure extends BaseTestStructure, NamedTestStructure, TypedTestStructure, DefaultExpressionedTestStructure {
    isOptional?: boolean;
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyTestStructure[];
}
