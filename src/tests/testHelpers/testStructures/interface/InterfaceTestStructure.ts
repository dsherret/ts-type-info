import {NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure} from "./../base";
import {TypeExpressionTestStructure} from "./../expressions";
import {CallSignatureTestStructure, IndexSignatureTestStructure} from "./../general";
import {InterfaceMethodTestStructure} from "./InterfaceMethodTestStructure";
import {InterfacePropertyTestStructure} from "./InterfacePropertyTestStructure";

export interface InterfaceTestStructure extends NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: CallSignatureTestStructure[];
    callSignatures?: CallSignatureTestStructure[];
    indexSignatures?: IndexSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypeExpressions?: TypeExpressionTestStructure[];
}
