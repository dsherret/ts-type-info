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

        return new Type(this, tsType, this.node);
    }

    getSymbolAtLocation(node: ts.Node) {
        return (node as any).symbol as ts.Symbol;
    }

    getSymbolsInScope(node: ts.Node, flags: ts.SymbolFlags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    }

    getTypeAtLocation(node: ts.Node) {
        return new Type(this, this.typeChecker.getTypeAtLocation(node), this.node);
    }

    getTypeOfSymbol(symbol: ts.Symbol) {
        return new Type(this, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    }

    getTypeCheckerForTesting() {
        // get the type checker for testing purposes
        return this.typeChecker;
    }

    typeToString(tsType: ts.Type) {
        return this.typeChecker.typeToString(tsType, this.node, ts.TypeFormatFlags.None);
    }
}
