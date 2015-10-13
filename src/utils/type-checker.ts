import * as ts from "typescript";
import {Type} from "./../types";

export class TypeChecker {
    constructor(private typeChecker: ts.TypeChecker, private node: ts.Node) {
    }

    getSymbolAtLocation(node: ts.Node): ts.Symbol {
        return (node as any).symbol;
    }

    getTypeOfSymbol(symbol: ts.Symbol) {
        return new Type(this.typeChecker, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    }
}
