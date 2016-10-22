import {BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure, JsDocedStructure} from "./../base";
import {NamespaceDeclarationType} from "./../../definitions";

export interface NamespaceStructure extends BaseStructure, NamedStructure, ExportableStructure, ModuledStructure, AmbientableStructure, JsDocedStructure {
    declarationType?: NamespaceDeclarationType;
}
