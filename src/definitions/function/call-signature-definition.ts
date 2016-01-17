import * as ts from "typescript";
import {ParameterDefinition} from "./parameter-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./base";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";

export class CallSignatureDefinition implements ITypeParameteredDefinition, IParameteredDefinition<ParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(ParameterDefinition, typeChecker, signature);
        this.fillTypeParametersBySignature(typeChecker, signature);

        this.minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }

    // ParameteredDefinition
    fillParametersBySymbol: (parameterDefinition: typeof ParameterDefinition, typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (parameterDefinition: typeof ParameterDefinition, typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnTypeExpression: TypeExpression;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    typeParameters: TypeParameterDefinition[];
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
