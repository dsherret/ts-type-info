import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure, JsDocedTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./EnumMemberTestStructure";

export interface EnumTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure,
        JsDocedTestStructure {
    isConst?: boolean;
    members?: EnumMemberTestStructure[];
}
