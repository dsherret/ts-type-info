import {BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure, DocumentationedStructure} from "./../base";
import {EnumMemberStructure} from "./EnumMemberStructure";

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure, DocumentationedStructure {
    isConst?: boolean;
    members?: EnumMemberStructure[];
}
