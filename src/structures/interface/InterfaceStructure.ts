import {BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, JsDocedStructure} from "./../base";
import {CallSignatureStructure} from "./../general";
import {InterfaceMethodStructure} from "./InterfaceMethodStructure";
import {InterfacePropertyStructure} from "./InterfacePropertyStructure";

export interface InterfaceStructure extends BaseStructure, NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure, JsDocedStructure {
    callSignatures?: CallSignatureStructure[];
    extendsTypes?: string[];
    methods?: InterfaceMethodStructure[];
    newSignatures?: CallSignatureStructure[];
    properties?: InterfacePropertyStructure[];
}
