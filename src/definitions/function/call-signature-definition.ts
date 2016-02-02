import * as ts from "typescript";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./base";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";

export class CallSignatureDefinition implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(typeChecker, signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(typeChecker, signature);

        this.minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }

    // ParameteredDefinition
    parameters: CallSignatureParameterDefinition[];
    fillParametersBySymbol: (
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        typeChecker: TypeChecker,
        signature: ts.Signature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
