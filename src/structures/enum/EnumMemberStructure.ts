import {BaseStructure, NamedStructure, JsDocedStructure} from "./../base";

export interface EnumMemberStructure extends BaseStructure, NamedStructure, JsDocedStructure {
    value: number;
}
