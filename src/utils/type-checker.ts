import * as ts from "typescript";
import {TypeCreator} from "./../utils";

// this is just what I've found works. There are some hacky solutions in here.

export class TypeChecker {
    private typeCreator = new TypeCreator(this);

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
        return this.getReturnTypeFromSignature(signature);
    }

    getReturnTypeFromSignature(signature: ts.Signature) {
        const tsType = this.typeChecker.getReturnTypeOfSignature(signature);

        return this.getTypeFromTsType(tsType);
    }

    getSymbolAtLocation(node: ts.Node) {
        return (node as any).symbol as ts.Symbol;
    }

    getSymbolsInScope(node: ts.Node, flags: ts.SymbolFlags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    }

    getTypeAtLocation(node: ts.Node) {
        return this.getTypeFromTsType(this.typeChecker.getTypeAtLocation(node));
    }

    getTypeOfSymbol(symbol: ts.Symbol) {
        return this.getTypeFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node));
    }

    getTypeCheckerForTesting() {
        // get the type checker for testing purposes
        return this.typeChecker;
    }

    typeToString(tsType: ts.Type) {
        return this.typeChecker.typeToString(tsType, this.node, ts.TypeFormatFlags.None);
    }

    getMinArgumentCount(signature: ts.Signature) {
        return (signature as any)["minArgumentCount"];
    }

    getTypeFromTsType(tsType: ts.Type) {
        return this.typeCreator.get(tsType);
    }
}
