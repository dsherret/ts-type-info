import * as ts from "typescript";
import {TypedDefinition} from "./../definitions";
import {TypeChecker} from "./../utils";

export class PropertyDefinition extends TypedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);
    }

    static isProperty(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Property) != 0;
    }
}
