import {BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure} from "./../base";
import {EnumMemberStructure} from "./EnumMemberStructure";

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure {
    isConst?: boolean;
    members?: EnumMemberStructure[];
}
