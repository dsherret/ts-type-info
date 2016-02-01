import * as ts from "typescript";
import {TypeParameterDefinition} from "./../general";
import {TypeChecker} from "./../../utils";

export interface ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbol(typeChecker: TypeChecker, parentSymbol: ts.Symbol, parent: this): void;
    fillTypeParametersBySignature(typeChecker: TypeChecker, parentSignature: ts.Signature, parent: this): void;
}

export abstract class TypeParameteredDefinition implements ITypeParameteredDefinition {
    typeParameters: TypeParameterDefinition<this>[];

    fillTypeParametersBySymbol(typeChecker: TypeChecker, parentSymbol: ts.Symbol, parent: this) {
        this.typeParameters = typeChecker.getFunctionTypeParameterSymbols(parentSymbol)
                                .map(symbol => new TypeParameterDefinition<this>(typeChecker, symbol, this));
    }

    fillTypeParametersBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this.typeParameters = (signature.typeParameters || [])
                                .map(typeParameter => new TypeParameterDefinition<this>(typeChecker, typeParameter.getSymbol(), this));
    }
}
