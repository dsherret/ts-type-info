import * as ts from "typescript";
import {BaseMethodDefinition} from "./base/base-method-definition";

export class MethodDefinition extends BaseMethodDefinition {
    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
