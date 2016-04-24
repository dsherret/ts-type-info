import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeExpressionedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";

export interface TypeAliasTestStructure
    extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeExpressionedTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
}
