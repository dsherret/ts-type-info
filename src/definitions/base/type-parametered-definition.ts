import * as ts from "typescript";
import {TypeParameterDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbol(typeChecker: TypeChecker, parentSymbol: ts.Symbol): void;
    fillTypeParametersBySignature(typeChecker: TypeChecker, parentSignature: ts.Signature): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];

    fillTypeParametersBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = typeChecker.getTypeParameterSymbolsFromSymbol(symbol)
                                         .map(typeParameterSymbol => new TypeParameterDefinition<this>(typeChecker, typeParameterSymbol, this));
    }

    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this.typeParameters = (signature.typeParameters || [])
                                .map(typeParameter => new TypeParameterDefinition<this>(typeChecker, typeParameter.getSymbol(), this));
    }
}
