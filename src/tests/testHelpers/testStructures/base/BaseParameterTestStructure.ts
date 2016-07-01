import {ObjectPropertyTestStructure} from "./../general/ObjectPropertyTestStructure";
import {NamedTestStructure} from "./NamedTestStructure";
import {OptionalTestStructure} from "./OptionalTestStructure";
import {BaseTestStructure} from "./BaseTestStructure";
import {TypedTestStructure} from "./TypedTestStructure";
import {DefaultExpressionedTestStructure} from "./DefaultExpressionedTestStructure";

export interface BaseParameterTestStructure extends BaseTestStructure, NamedTestStructure, OptionalTestStructure, TypedTestStructure, DefaultExpressionedTestStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyTestStructure[];
}
