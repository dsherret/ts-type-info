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

    getSymbolsInScope(node: ts.Node, flags: ts.SymbolFlags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    }

    getFullyQualifiedName(symbol: ts.Symbol) {
        return this.typeChecker.getFullyQualifiedName(symbol);
    }

    getBaseTypeSymbols(classSymbol: ts.Symbol) {
        return this.typeChecker.getBaseTypes(this.getTypeOfSymbol(classSymbol).tsType as any).map((baseTypes) => {
            return baseTypes.symbol;
        });
    }
}
