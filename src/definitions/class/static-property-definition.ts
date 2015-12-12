import * as ts from "typescript";
import {BaseClassPropertyDefinition} from "./base";

export class StaticPropertyDefinition extends BaseClassPropertyDefinition {
    static isStaticProperty(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0;
    }
}
