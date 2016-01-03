import * as ts from "typescript";
import {TypeExpressionCache} from "./../utils";

// this is just what I've found works. There are some hacky solutions in here.

export class TypeChecker {
    private typeCreator: TypeExpressionCache;
    private node: ts.Node;

    constructor(private typeChecker: ts.TypeChecker) {
    }

    setTypeCache(typeCreator: TypeExpressionCache) {
        this.typeCreator = typeCreator;
    }

    setCurrentNode(node: ts.Node) {
        this.node = node;
    }

    getExtendsTypes(symbol: ts.Symbol) {
        const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);

        return symbolType.getBaseTypes().map(t => this.getTypeExpressionFromTsType(t));
    }

    getImplementsTypes(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null) {
            const valueDeclaration = symbol.valueDeclaration as ts.ClassLikeDeclaration;
            const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);
            const implementsIndex = symbolType.getBaseTypes().length > 0 ? 1 : 0;

            if (valueDeclaration.heritageClauses != null && valueDeclaration.heritageClauses.length > implementsIndex) {
                const types = valueDeclaration.heritageClauses[implementsIndex].types;

                if (types != null && types.length > 0) {
                    return types.map(t => this.typeChecker.getTypeAtLocation(t))
                        .map(t => this.getTypeExpressionFromTsType(t));
                }
            }
        }

        return [];
    }

    getConstantValue(symbol: ts.Symbol) {
        return this.typeChecker.getConstantValue(symbol.valueDeclaration as any);
    }

    getFunctionTypeParameterSymbols(symbol: ts.Symbol) {
        const declaration = symbol.valueDeclaration as ts.ClassLikeDeclaration;

        return (declaration.typeParameters || []).map(p => this.getSymbolAtLocation(p));
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

        return this.getTypeExpressionFromTsType(tsType);
    }

    getSignatureFromDeclaration(declaration: ts.SignatureDeclaration) {
        return this.typeChecker.getSignatureFromDeclaration(declaration);
    }

    getSourceFileOfSymbol(symbol: ts.Symbol) {
        let currentNode: ts.Node = (symbol.valueDeclaration || symbol.getDeclarations()[0]).parent;

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

    getSymbolsFromType(type: ts.Type) {
        const typeArray = (type as ts.UnionOrIntersectionType).types;

        if (typeArray != null) {
            return typeArray.map(t => t.symbol).filter(s => s != null);
        }
        else if (type.symbol != null) {
            return [type.symbol];
        }
        else {
            return [];
        }
    }

    getSymbolsInScope(node: ts.Node, flags: ts.SymbolFlags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    }

    getTypeExpressionAtLocation(node: ts.Node) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeAtLocation(node));
    }

    getTypeExpressionOfSymbol(symbol: ts.Symbol) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node));
    }

    getTypeExpressionFromTsType(tsType: ts.Type) {
        return this.typeCreator.get(tsType);
    }

    getTypeCheckerForTesting() {
        // get the type checker for testing purposes
        return this.typeChecker;
    }

    getFileImportSymbols(file: ts.SourceFile) {
        const importDeclarations = (file as any)["imports"] as ts.Node[];
        const importClauses = importDeclarations.map(d => (d.parent as ts.ImportDeclaration).importClause);
        const fileImports: ts.Symbol[] = [];

        importClauses.filter(c => c != null).forEach(c => {
            if (c.namedBindings != null) {
                const namedBindings = (c.namedBindings as (ts.NamedImportsOrExports & ts.NamespaceImport));

                if (namedBindings.elements != null) {
                    // named exports
                    namedBindings.elements.forEach(e => {
                        const symbol = this.typeChecker.getAliasedSymbol(this.getSymbolAtLocation(e));

                        if (symbol == null) {
                            console.warn(`Unknown symbol: ${e.name.text}`);
                        }
                        else {
                            fileImports.push(symbol);
                        }
                    });
                }
                else if (namedBindings.name != null) {
                    // * as exports
                    const starSymbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(namedBindings.name));

                    if (starSymbol == null) {
                        console.warn(`Unknown symbol: ${namedBindings.name.text}`);
                    }
                    else {
                        for (const exportSymbol of this.typeChecker.getExportsOfModule(starSymbol)) {
                            fileImports.push(exportSymbol);
                        }
                    }
                }
            }
            else if (c.name != null) {
                // default exports
                fileImports.push(this.typeChecker.getTypeAtLocation(c).symbol);
            }
            else {
                console.warn(`Unknown import clause in ${file.fileName}`);
            }
        });

        return fileImports;
    }

    getFileReExportSymbols(file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);
        const fileReExports: ts.Symbol[] = [];

        // when a file doesn't have exports the symbol will be null
        if (fileSymbol != null) {
            for (const exportSymbol of this.typeChecker.getExportsOfModule(fileSymbol)) {
                if (!this.isSymbolExportOfFile(exportSymbol, file)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports;
    }

    isOptionalProperty(symbol: ts.Symbol) {
        return symbol.valueDeclaration != null && (symbol.valueDeclaration as ts.ParameterDeclaration).questionToken != null;
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
