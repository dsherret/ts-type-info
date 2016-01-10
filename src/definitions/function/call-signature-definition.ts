import * as ts from "typescript";
import {ParameterDefinition, TypeParameterDefinition} from "./../../definitions";
import {IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./base";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";

export class CallSignatureDefinition implements IReturnTypedDefinition, IParameteredDefinition<ParameterDefinition> {
    private _minArgumentCount: number;
    private _typeParameters: TypeParameterDefinition[];

    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(ParameterDefinition, typeChecker, signature);

        this.fillTypeParameters(typeChecker, signature);
        this._minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }

    get minArgumentCount() {
        return this._minArgumentCount;
    }

    get typeParameters() {
        return this._typeParameters;
    }

    private fillTypeParameters(typeChecker: TypeChecker, signature: ts.Signature) {
        this._typeParameters = [];

        if (signature.typeParameters != null) {
            for (const typeParameter of signature.typeParameters) {
                this._typeParameters.push(new TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    }

    // ParameteredDefinition
    fillParametersBySymbol: (parameterDefinition: typeof ParameterDefinition, typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (parameterDefinition: typeof ParameterDefinition, typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnTypeExpression: TypeExpression;
}

applyMixins(CallSignatureDefinition, [ReturnTypedDefinition, ParameteredDefinition]);
