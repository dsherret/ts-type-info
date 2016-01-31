import * as ts from "typescript";
import {TypeParameterDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface ITypeParameteredDefinition<ThisType> {
    typeParameters: TypeParameterDefinition<ThisType>[];
    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
}

export abstract class TypeParameteredDefinition<ThisType> implements ITypeParameteredDefinition<ThisType> {
    typeParameters: TypeParameterDefinition<ThisType>[];

    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(s => new TypeParameterDefinition<ThisType>(typeChecker, s));
    }

    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this.typeParameters = [];

        if (signature.typeParameters != null) {
            for (const typeParameter of signature.typeParameters) {
                this.typeParameters.push(new TypeParameterDefinition<ThisType>(typeChecker, typeParameter.getSymbol()));
            }
        }
    }
}
