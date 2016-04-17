import {NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";
import {CallSignatureStructure} from "./../function";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}
