import {BaseTestStructure, NamedTestStructure, JsDocedTestStructure} from "./../base";

export interface EnumMemberTestStructure extends BaseTestStructure, NamedTestStructure, JsDocedTestStructure {
    value: number;
}
