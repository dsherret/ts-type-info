import {NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../../expressions";
import {InterfaceMethodTestStructure} from "./interface-method-test-structure";
import {InterfacePropertyTestStructure} from "./interface-property-test-structure";
import {InterfaceNewSignatureTestStructure} from "./interface-new-signature-test-structure";

export interface InterfaceTestStructure extends NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: InterfaceNewSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypeExpressions?: TypeExpressionTestStructure[];
}
