import * as ts from "typescript";
import {TypeParameterDefinition} from "./type-parameter-definition";
import {TypeChecker} from "./../../utils";

export interface ITypeParameteredDefinition {
    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
    typeParameters: TypeParameterDefinition[];
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    private _typeParameters: TypeParameterDefinition[] = [];

    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(s => new TypeParameterDefinition(typeChecker, s));
    }

    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this._typeParameters = [];

        if (signature.typeParameters != null) {
            for (const typeParameter of signature.typeParameters) {
                this._typeParameters.push(new TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    }

    get typeParameters() {
        return this._typeParameters;
    }
}
