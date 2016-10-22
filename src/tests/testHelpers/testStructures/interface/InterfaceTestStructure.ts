import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, OrderableTestStructure,
    JsDocedTestStructure} from "./../base";
import {TypeTestStructure} from "./../expression";
import {CallSignatureTestStructure, IndexSignatureTestStructure} from "./../general";
import {InterfaceMethodTestStructure} from "./InterfaceMethodTestStructure";
import {InterfacePropertyTestStructure} from "./InterfacePropertyTestStructure";

export interface InterfaceTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, OrderableTestStructure,
            JsDocedTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: CallSignatureTestStructure[];
    callSignatures?: CallSignatureTestStructure[];
    indexSignatures?: IndexSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypes?: TypeTestStructure[];
}
