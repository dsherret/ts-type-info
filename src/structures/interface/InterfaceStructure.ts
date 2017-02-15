import {BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure} from "./../base";
import {CallSignatureStructure, IndexSignatureStructure} from "./../general";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";

export interface InterfaceStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, DocumentationedStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    indexSignatures?: IndexSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}
