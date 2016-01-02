import * as ts from "typescript";
import {TypeExpression} from "./../../types";
import {TypeChecker} from "./../../utils";

export interface ITypedDefinition {
    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    typeExpression: TypeExpression;
}

export abstract class TypedDefinition implements ITypedDefinition {
    private _typeExpression: TypeExpression;

    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeExpression = typeChecker.getTypeOfSymbol(symbol);
    }

    get typeExpression() {
        return this._typeExpression;
    }
}
