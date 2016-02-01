import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../function";
import {TypeExpression} from "./../../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";

export class InterfaceNewSignatureDefinition implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition {
    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillParametersBySignature(typeChecker, signature, this, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
    }

    // ParameteredDefinition
    parameters: InterfaceNewSignatureParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parent: this,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parent: this,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
