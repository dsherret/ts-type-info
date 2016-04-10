import {NamedTestStructure, ExportableTestStructure, AmbientableTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./EnumMemberTestStructure";

export interface EnumTestStructure extends NamedTestStructure, ExportableTestStructure, AmbientableTestStructure {
    members?: EnumMemberTestStructure[];
}
