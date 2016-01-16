import {BasePropertyStructure, NamedStructure, ExportableStructure, TypeParameteredStructure} from "./../base";
import {TypeExpressionStructure} from "./../../expressions";
import {InterfaceMethodStructure} from "./interface-method-structure";
import {InterfaceNewSignatureStructure} from "./interface-new-signature-structure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: BasePropertyStructure[];
    extendsTypeExpressions?: TypeExpressionStructure[];
}
