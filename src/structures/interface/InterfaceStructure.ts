import {BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure} from "./../base";
import {CallSignatureStructure} from "./../general";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";

export interface InterfaceStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}
