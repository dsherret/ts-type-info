import * as ts from "typescript";
import {BaseFunctionDefinition, ParameterDefinition} from "./../function";
import {TypeChecker} from "./../../utils";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<ParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ParameterDefinition, typeChecker, symbol);
    }

    static isMethod(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Method) !== 0;
    }
}
