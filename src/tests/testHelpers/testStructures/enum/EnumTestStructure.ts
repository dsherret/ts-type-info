import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./EnumMemberTestStructure";

export interface EnumTestStructure extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure {
    isConst?: boolean;
    members?: EnumMemberTestStructure[];
}
