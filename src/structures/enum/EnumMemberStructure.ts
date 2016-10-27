import {BaseStructure, NamedStructure, DocumentationedStructure} from "./../base";

export interface EnumMemberStructure extends BaseStructure, NamedStructure, DocumentationedStructure {
    value: number;
}
