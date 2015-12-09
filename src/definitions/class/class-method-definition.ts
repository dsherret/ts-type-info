import * as ts from "typescript";
import {BaseMethodDefinition} from "./base/base-class-method-definition";

export class ClassMethodDefinition extends BaseMethodDefinition {
    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
