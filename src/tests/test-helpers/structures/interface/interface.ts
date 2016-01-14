import {Property, Named, Exportable, TypeParametered} from "./../base";
import {InterfaceMethod} from "./interface-method";
import {InterfaceNewSignature} from "./interface-new-signature";
import {TypeExpressionStructure} from "./../expressions";

export interface Interface extends Named, Exportable, TypeParametered {
    methods?: InterfaceMethod[];
    newSignatures?: InterfaceNewSignature[];
    properties?: Property[];
    extends?: TypeExpressionStructure[];
}
