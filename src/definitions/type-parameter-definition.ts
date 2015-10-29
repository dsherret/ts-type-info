import * as ts from "typescript";
import {NamedDefinition} from "./../definitions";
import {Type} from "./../types";
import {TypeChecker, Serializable} from "./../utils";

export class TypeParameterDefinition extends NamedDefinition {
    constraint: Type;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(symbol);

        this.setConstraint(typeChecker, symbol);
    }

    private setConstraint(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const declaration = this.getTypeDeclaration(typeChecker, symbol);

        if (declaration.constraint != null) {
            this.constraint = typeChecker.getTypeAtLocation(declaration.constraint);
        }
    }

    private getTypeDeclaration(typeChecker: TypeChecker, symbol: ts.Symbol) {
        return symbol.getDeclarations()[0] as ts.TypeParameterDeclaration;
    }

    static isTypeParameter(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.TypeParameter) !== 0;
    }
}
