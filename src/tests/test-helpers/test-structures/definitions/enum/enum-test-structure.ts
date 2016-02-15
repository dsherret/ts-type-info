import {NamedTestStructure, ExportableTestStructure, AmbientableTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./enum-member-test-structure";

export interface EnumTestStructure extends NamedTestStructure, ExportableTestStructure, AmbientableTestStructure {
    members?: EnumMemberTestStructure[];
}
