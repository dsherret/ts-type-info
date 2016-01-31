import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {IParameteredDefinition, ParameteredDefinition, FunctionParameterDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../function";
import {TypeExpression} from "./../../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";

export class InterfaceNewSignatureDefinition implements IParameteredDefinition<InterfaceNewSignatureDefinition, InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition {
    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillParametersBySignature(FunctionParameterDefinition, typeChecker, signature);
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (
        parameterDefinition: typeof FunctionParameterDefinition,
        typeChecker: TypeChecker,
        symbol: ts.Symbol) => void;
    fillParametersBySignature: (
        parameterDefinition: typeof FunctionParameterDefinition,
        typeChecker: TypeChecker,
        signature: ts.Signature) => void;
    parameters: FunctionParameterDefinition[];
    // ReturnTyped
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnTypeExpression: TypeExpression;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
