import {NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";
import {InterfaceNewSignatureStructure} from "./InterfaceNewSignatureStructure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: InterfacePropertyStructure[];
    extendsTypes?: string[];
}
