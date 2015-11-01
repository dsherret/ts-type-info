import * as ts from "typescript";
import {Serializable} from "./../../utils";
import {Type} from "./../../types";
import {TypeChecker} from "./../../utils";

export interface IReturnTypedDefinition {
    fillReturnTypeBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    fillReturnTypeBySignature(typeChecker: TypeChecker, signature: ts.Signature): void;
    returnType: Type;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    private _returnType: Type;

    fillReturnTypeBySymbol(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    }

    fillReturnTypeBySignature(typeChecker: TypeChecker, signature: ts.Signature) {
        this._returnType = typeChecker.getReturnTypeFromSignature(signature);
    }

    @Serializable
    get returnType() {
        return this._returnType;
    }
}
