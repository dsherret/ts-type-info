import {NamedStructure, ExportableStructure, AmbientableStructure} from "./../base";
import {EnumMemberStructure} from "./EnumMemberStructure";

export interface EnumStructure extends NamedStructure, ExportableStructure, AmbientableStructure {
    members?: EnumMemberStructure[];
}
