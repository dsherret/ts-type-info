import {NamedStructure, ExportableStructure, ModuledStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../../../../definitions";

export interface NamespaceStructure extends NamedStructure, ExportableStructure, ModuledStructure {
    declarationType: NamespaceDeclarationType;
}
