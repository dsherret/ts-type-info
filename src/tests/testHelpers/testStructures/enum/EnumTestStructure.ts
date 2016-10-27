import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure, DocumentationedTestStructure} from "./../base";
import {EnumMemberTestStructure} from "./EnumMemberTestStructure";

export interface EnumTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, AmbientableTestStructure, OrderableTestStructure,
        DocumentationedTestStructure {
    isConst?: boolean;
    members?: EnumMemberTestStructure[];
}
