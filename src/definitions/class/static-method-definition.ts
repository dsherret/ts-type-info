import * as ts from "typescript";
import {BaseMethodDefinition} from "./base/base-class-method-definition";

export class StaticMethodDefinition extends BaseMethodDefinition {
    static isStaticMethod(symbol: ts.Symbol) {
        const flags = symbol.getFlags();

        // could be a function for value modules (see value-module-tests.ts)
        return (flags & ts.SymbolFlags.Method) !== 0 ||
            (flags & ts.SymbolFlags.Function);
    }
}
