import * as ts from "typescript";
import {TypeParameterDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];
    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[];

    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(s => new TypeParameterDefinition(typeChecker, s));
    }

    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this.typeParameters = [];

        if (signature.typeParameters != null) {
            for (const typeParameter of signature.typeParameters) {
                this.typeParameters.push(new TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    }
}
