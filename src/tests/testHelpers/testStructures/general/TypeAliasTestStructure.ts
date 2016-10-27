import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure,
    OrderableTestStructure, DocumentationedTestStructure} from "./../base";

export interface TypeAliasTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure,
        OrderableTestStructure, DocumentationedTestStructure {
}
