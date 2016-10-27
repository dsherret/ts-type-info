import {BaseTestStructure, NamedTestStructure, DocumentationedTestStructure} from "./../base";

export interface EnumMemberTestStructure extends BaseTestStructure, NamedTestStructure, DocumentationedTestStructure {
    value: number;
}
