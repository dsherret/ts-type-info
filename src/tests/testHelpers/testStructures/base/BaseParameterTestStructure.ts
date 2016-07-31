import {ObjectPropertyTestStructure} from "./../general/ObjectPropertyTestStructure";
import {OptionallyNamedTestStructure} from "./OptionallyNamedTestStructure";
import {OptionalTestStructure} from "./OptionalTestStructure";
import {BaseTestStructure} from "./BaseTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";
import {DefaultExpressionedTestStructure} from "./DefaultExpressionedTestStructure";

export interface BaseParameterTestStructure extends BaseTestStructure, OptionallyNamedTestStructure, OptionalTestStructure, TypedTestStructure, DefaultExpressionedTestStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyTestStructure[];
}
