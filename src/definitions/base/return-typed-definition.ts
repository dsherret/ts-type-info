import * as ts from "typescript";
import {Serializable} from "./../../utils";
import {Type} from "./../../types";
import {TypeChecker} from "./../../utils";

export interface IReturnTypedDefinition {
    fillReturnType(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    returnType: Type;
}

export abstract class ReturnTypedDefinition implements IReturnTypedDefinition {
    private _returnType: Type;

    fillReturnType(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    }

    @Serializable
    get returnType() {
        return this._returnType;
    }
}
