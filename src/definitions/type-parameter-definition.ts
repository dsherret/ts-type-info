import * as ts from "typescript";
import {Type} from "./../types";
import {applyMixins, TypeChecker} from "./../utils";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";

export class TypeParameterDefinition implements INamedDefinition {
    constraint: Type;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);

        this.fillConstraint(typeChecker, symbol);
    }

    private fillConstraint(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const declaration = this.getTypeDeclaration(typeChecker, symbol);

        if (declaration.constraint != null) {
            this.constraint = typeChecker.getTypeAtLocation(declaration.constraint);
        }
    }

    private getTypeDeclaration(typeChecker: TypeChecker, symbol: ts.Symbol) {
        return symbol.getDeclarations()[0] as ts.TypeParameterDeclaration;
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;

    static isTypeParameter(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.TypeParameter) !== 0;
    }
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
