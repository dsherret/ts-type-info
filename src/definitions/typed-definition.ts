import * as ts from "typescript";
import {NamedDefinition} from "./../definitions";
import {Type} from "./../types";
import {TypeChecker, Serializable} from "./../utils";

export abstract class TypedDefinition extends NamedDefinition {
    private _type: Type;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(symbol);

        this._type = typeChecker.getTypeOfSymbol(symbol);
    }

    @Serializable
    get type() {
        return this._type;
    }
}
