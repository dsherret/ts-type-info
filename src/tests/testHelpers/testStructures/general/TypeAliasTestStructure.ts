import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";

export interface TypeAliasTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
}
