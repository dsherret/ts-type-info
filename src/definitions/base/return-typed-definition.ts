import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {TypeChecker} from "./../../utils";

export interface IReturnTypedDefinition {
    fillReturnTypeExpressionBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillReturnTypeExpressionBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
    returnTypeExpression: TypeExpression;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    returnTypeExpression: TypeExpression;

    fillReturnTypeExpressionBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.returnTypeExpression = typeChecker.getReturnTypeFromSymbol(symbol);
    }

    fillReturnTypeExpressionBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this.returnTypeExpression = typeChecker.getReturnTypeFromSignature(signature);
    }
}
