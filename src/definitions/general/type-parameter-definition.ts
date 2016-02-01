import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition} from "./../base";

export class TypeParameterDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType> {
    constraintTypeExpression: TypeExpression;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType) {
        this.fillName(typeChecker, symbol);
        this.fillConstraint(typeChecker, symbol);
        this.parent = parent;
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
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ParentType;
}

applyMixins(TypeParameterDefinition, [NamedDefinition]);
