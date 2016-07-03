import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../../../definitions";

export interface NamespaceTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure, OrderableTestStructure {
    declarationType?: NamespaceDeclarationType;
}
