import * as ts from "typescript";
import {CallSignatureDefinition} from "./call-signature-definition";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {TypeChecker} from "./../../utils";

export class CallSignatureParameterDefinition extends BaseParameterDefinition<CallSignatureDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: CallSignatureDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.CallSignatureParameter);
    }
}
