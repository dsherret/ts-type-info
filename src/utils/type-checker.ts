import * as ts from "typescript";
import {Type} from "./../types";

// this is just what I've found works. There are some hacky solutions in here.

export class TypeChecker {
    constructor(private typeChecker: ts.TypeChecker, private node: ts.Node) {
    }

    getBaseTypeSymbols(classSymbol: ts.Symbol) {
        return this.typeChecker.getBaseTypes(this.getTypeOfSymbol(classSymbol).tsType as any).map((baseTypes) => {
            return baseTypes.symbol;
        });
    }

    getFullyQualifiedName(symbol: ts.Symbol) {
        return this.typeChecker.getFullyQualifiedName(symbol);
    }

    getReturnTypeFromSymbol(symbol: ts.Symbol) {
        const signature = this.typeChecker.getSignatureFromDeclaration(symbol.valueDeclaration as any);
        const tsType = this.typeChecker.getReturnTypeOfSignature(signature);

        return new Type(this.typeChecker, tsType, this.node);
    }

    getSymbolAtLocation(node: ts.Node): ts.Symbol {
        return (node as any).symbol;
    }

    getSymbolsInScope(node: ts.Node, flags: ts.SymbolFlags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    }

    getTypeOfSymbol(symbol: ts.Symbol) {
        return new Type(this.typeChecker, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    }

    getTypeCheckerForTesting() {
        // get the type checker for testing purposes
        return this.typeChecker;
    }
}
