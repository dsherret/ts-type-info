import {NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../../expressions";
import {InterfaceMethodTestStructure} from "./InterfaceMethodTestStructure";
import {InterfacePropertyTestStructure} from "./InterfacePropertyTestStructure";
import {InterfaceNewSignatureTestStructure} from "./InterfaceNewSignatureTestStructure";

export interface InterfaceTestStructure extends NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: InterfaceNewSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypeExpressions?: TypeExpressionTestStructure[];
}
