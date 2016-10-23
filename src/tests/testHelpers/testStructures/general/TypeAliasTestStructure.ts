import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure,
    OrderableTestStructure, JsDocedTestStructure} from "./../base";

export interface TypeAliasTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure,
        OrderableTestStructure, JsDocedTestStructure {
}
