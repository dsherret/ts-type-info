import {NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";
import {TypeExpressionStructure} from "./../../expressions";
import {InterfaceMethodStructure} from "./interface-method-structure";
import {InterfaceMethodParameterStructure} from "./interface-method-parameter-structure";
import {InterfacePropertyStructure} from "./interface-property-structure";
import {InterfaceNewSignatureStructure} from "./interface-new-signature-structure";

export interface InterfaceStructure extends NamedStructure, ExportableStructure, TypeParameteredStructure, AmbientableStructure {
    methods?: InterfaceMethodStructure[];
    newSignatures?: InterfaceNewSignatureStructure[];
    properties?: InterfacePropertyStructure[];
    extendsTypeExpressions?: TypeExpressionStructure[];
}
