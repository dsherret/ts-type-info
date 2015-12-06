import * as ts from "typescript";
import {BaseMethodDefinition} from "./base/base-method-definition";

export class StaticMethodDefinition extends BaseMethodDefinition {
    static isStaticMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
