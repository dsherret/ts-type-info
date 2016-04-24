import {BaseTestStructure, NamedTestStructure} from "./../base";

export interface EnumMemberTestStructure extends BaseTestStructure, NamedTestStructure {
    value: number;
}
