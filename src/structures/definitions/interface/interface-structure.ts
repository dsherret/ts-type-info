import {NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";
import {InterfaceMethodStructure} from "./interface-method-structure";
import {InterfacePropertyStructure} from "./interface-property-structure";
import {InterfaceNewSignatureStructure} from "./interface-new-signature-structure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: InterfacePropertyStructure[];
    extendsTypes?: string[];
}
