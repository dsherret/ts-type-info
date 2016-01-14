import {NamedStructure, ExportableStructure} from "./../base";
import {EnumMemberStructure} from "./enum-member-structure";

export interface EnumStructure extends NamedStructure, ExportableStructure {
    members?: EnumMemberStructure[];
}
