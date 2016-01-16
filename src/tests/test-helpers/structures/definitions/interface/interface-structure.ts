import {NamedStructure, ExportableStructure, TypeParameteredStructure} from "./../base";
import {TypeExpressionStructure} from "./../../expressions";
import {InterfaceMethodStructure} from "./interface-method-structure";
import {InterfacePropertyStructure} from "./interface-property-structure";
import {InterfaceNewSignatureStructure} from "./interface-new-signature-structure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: InterfacePropertyStructure[];
    extendsTypeExpressions?: TypeExpressionStructure[];
}
