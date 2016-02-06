import * as ts from "typescript";
import {TypeChecker} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: InterfaceNewSignatureDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
