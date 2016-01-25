import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition} from "./../base";

export class TypeParameterDefinition implements INamedDefinition {
    constraintTypeExpression: TypeExpression;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillConstraint(typeChecker, symbol);
    }

    private fillConstraint(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const declaration = this.getTypeDeclaration(typeChecker, symbol);

        if (declaration.constraint != null) {
            this.constraintTypeExpression = typeChecker.getTypeExpressionAtLocation(declaration.constraint);
        }
    }

    private getTypeDeclaration(typeChecker: TypeChecker, symbol: ts.Symbol) {
        return symbol.getDeclarations()[0] as ts.TypeParameterDeclaration;
    }

    // NamedDefinition
    name: string;
    fillName: (symbol: ts.Symbol) => void;
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
