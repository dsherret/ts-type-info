import * as ts from "typescript";
import {BaseFunctionDefinition} from "./base/base-function-definition";

export class FunctionDefinition extends BaseFunctionDefinition {
    static isClassMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
