import * as ts from "typescript";
import {Scope} from "./../scope";
import {ParameterDefinition, TypeParameterDefinition} from "./../definitions";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./base/return-typed-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./base/parametered-definition";
import {applyMixins, TypeChecker, Serializable} from "./../utils";
import {Type} from "./../types";

export class CallSignatureDefinition implements IReturnTypedDefinition, IParameteredDefinition {
    private _minArgumentCount: number;
    private _typeParameters: TypeParameterDefinition[];

    constructor(typeChecker: TypeChecker, signature: ts.Signature) {
        this.fillReturnTypeBySignature(typeChecker, signature);
        this.fillParametersBySignature(typeChecker, signature);

        this.fillTypeParameters(typeChecker, signature);
        this._minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }

    @Serializable
    get minArgumentCount() {
        return this._minArgumentCount;
    }

    @Serializable
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
    fillParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: ParameterDefinition[];
    // ReturnTyped
    fillReturnTypeBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnType: Type;
}

applyMixins(CallSignatureDefinition, [ReturnTypedDefinition, ParameteredDefinition]);