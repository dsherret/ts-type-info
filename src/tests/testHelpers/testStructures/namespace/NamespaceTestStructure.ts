import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure,
    DocumentationedTestStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../../../definitions";

export interface NamespaceTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure,
            DocumentationedTestStructure {
    declarationType?: NamespaceDeclarationType;
}
