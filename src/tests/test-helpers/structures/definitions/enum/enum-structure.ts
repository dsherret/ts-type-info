import {NamedStructure, ExportableStructure, AmbientableStructure} from "./../base";
import {EnumMemberStructure} from "./enum-member-structure";

export interface EnumStructure extends NamedStructure, ExportableStructure, AmbientableStructure {
    members?: EnumMemberStructure[];
}
