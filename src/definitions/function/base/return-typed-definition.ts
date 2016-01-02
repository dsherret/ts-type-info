import * as ts from "typescript";
import {TypeExpression} from "./../../../types";
import {TypeChecker} from "./../../../utils";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillReturnTypeExpressionBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    private _returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._returnTypeExpression = typeChecker.getReturnTypeFromSymbol(symbol);
    }

    fillReturnTypeExpressionBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this._returnTypeExpression = typeChecker.getReturnTypeFromSignature(signature);
    }

    get returnTypeExpression() {
        return this._returnTypeExpression;
    }
}
