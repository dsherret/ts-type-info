import {NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../expressions";
import {CallSignatureTestStructure} from "./../function";
import {InterfaceMethodTestStructure} from "./InterfaceMethodTestStructure";
import {InterfacePropertyTestStructure} from "./InterfacePropertyTestStructure";
import {InterfaceNewSignatureTestStructure} from "./InterfaceNewSignatureTestStructure";

export interface InterfaceTestStructure extends NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: InterfaceNewSignatureTestStructure[];
    callSignatures?: CallSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypeExpressions?: TypeExpressionTestStructure[];
}
