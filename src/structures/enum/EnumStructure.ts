import {BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure, JsDocedStructure} from "./../base";
import {EnumMemberStructure} from "./EnumMemberStructure";

export interface EnumStructure extends BaseStructure, NamedStructure, ExportableStructure, AmbientableStructure, JsDocedStructure {
    isConst?: boolean;
    members?: EnumMemberStructure[];
}
