import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure,
    JsDocedTestStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../../../definitions";

export interface NamespaceTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure,
            JsDocedTestStructure {
    declarationType?: NamespaceDeclarationType;
}
