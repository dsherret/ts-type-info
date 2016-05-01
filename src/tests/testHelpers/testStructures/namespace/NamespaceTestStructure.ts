import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../../../definitions";

export interface NamespaceTestStructure extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, ModuledTestStructure, AmbientableTestStructure {
    declarationType?: NamespaceDeclarationType;
}
