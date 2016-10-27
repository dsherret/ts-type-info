import {BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure, DocumentationedStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../definitions";

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure, DocumentationedStructure {
    declarationType?: NamespaceDeclarationType;
}
