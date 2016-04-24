import {BaseStructure, NamedStructure} from "./../base";

export interface EnumMemberStructure extends BaseStructure, NamedStructure {
    value: number;
}
