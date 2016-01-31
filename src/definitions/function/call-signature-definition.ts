import * as ts from "typescript";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./base";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";

export class CallSignatureDefinition implements ITypeParameteredDefinition<CallSignatureDefinition>, IParameteredDefinition<CallSignatureDefinition,
                                                CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(CallSignatureParameterDefinition, typeChecker, signature);
        this.fillTypeParametersBySignature(typeChecker, signature);

        this.minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (parameterDefinition: typeof CallSignatureParameterDefinition, typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (parameterDefinition: typeof CallSignatureParameterDefinition, typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: CallSignatureParameterDefinition[];
    // ReturnTyped
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnTypeExpression: TypeExpression;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    typeParameters: TypeParameterDefinition<CallSignatureDefinition>[];
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
