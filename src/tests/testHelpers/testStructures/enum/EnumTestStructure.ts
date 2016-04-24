import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./EnumMemberTestStructure";

export interface EnumTestStructure extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure {
    members?: EnumMemberTestStructure[];
}
