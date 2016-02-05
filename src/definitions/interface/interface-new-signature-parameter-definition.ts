import * as ts from "typescript";
import {DefinitionType} from "./../base";
import {BaseParameterDefinition} from "./../function";
import {TypeChecker} from "./../../utils";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceNewSignatureDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
