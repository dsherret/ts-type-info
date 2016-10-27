import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, OrderableTestStructure,
    DocumentationedTestStructure} from "./../base";
import {TypeTestStructure} from "./../expression";
import {CallSignatureTestStructure, IndexSignatureTestStructure} from "./../general";
import {InterfaceMethodTestStructure} from "./InterfaceMethodTestStructure";
import {InterfacePropertyTestStructure} from "./InterfacePropertyTestStructure";

export interface InterfaceTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypeParameteredTestStructure, AmbientableTestStructure, OrderableTestStructure,
            DocumentationedTestStructure {
    methods?: InterfaceMethodTestStructure[];
    newSignatures?: CallSignatureTestStructure[];
    callSignatures?: CallSignatureTestStructure[];
    indexSignatures?: IndexSignatureTestStructure[];
    properties?: InterfacePropertyTestStructure[];
    extendsTypes?: TypeTestStructure[];
}
