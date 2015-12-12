import * as ts from "typescript";
import {BaseClassMethodDefinition} from "./base";

export class ClassMethodDefinition extends BaseClassMethodDefinition {
    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
