import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";

export class PropertyDefinition implements ITypeExpressionedDefinition, INamedDefinition {
    private _isOptional: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);

        this._isOptional = typeChecker.isOptionalProperty(symbol);
    }

    get isOptional() {
        return this._isOptional;
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // TypeExpressionedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
}

applyMixins(PropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
