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

    getMinArgumentCount(signature: ts.Signature) {
        return (signature as any)["minArgumentCount"];
    }

    getReturnTypeFromSymbol(symbol: ts.Symbol) {
        const signature = this.typeChecker.getSignatureFromDeclaration(symbol.valueDeclaration as any);
        return this.getReturnTypeFromSignature(signature);
    }

    getReturnTypeFromSignature(signature: ts.Signature) {
        const tsType = this.typeChecker.getReturnTypeOfSignature(signature);

        return this.getTypeFromTsType(tsType);
    }

    getSourceFileOfSymbol(symbol: ts.Symbol) {
        let currentNode: ts.Node = symbol.valueDeclaration.parent;

        while (currentNode != null && typeof (currentNode as ts.SourceFile).fileName !== "string") {
            currentNode = currentNode.parent;
        }

        if (currentNode == null) {
            throw new Error("Error getting source file of symbol.");
        }

        return currentNode as ts.SourceFile;
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

    getTypeFromTsType(tsType: ts.Type) {
        return this.typeCreator.get(tsType);
    }

    isSymbolInFile(symbol: ts.Symbol, file: ts.SourceFile) {
        return this.getSourceFileOfSymbol(symbol).fileName === file.fileName;
    }

    isSymbolExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);

        // when a file doesn't have exports the symbol will be null
        return fileSymbol != null && fileSymbol.exports[symbol.name] != null;
    }

    typeToString(tsType: ts.Type) {
        return this.typeChecker.typeToString(tsType, this.node, ts.TypeFormatFlags.None);
    }
}
