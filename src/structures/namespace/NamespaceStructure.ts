import {BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../definitions";

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure {
    declarationType?: NamespaceDeclarationType;
}
