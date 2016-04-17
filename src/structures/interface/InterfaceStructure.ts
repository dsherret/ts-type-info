import {NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";
import {CallSignatureStructure} from "./../general";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}
