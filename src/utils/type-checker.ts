import * as ts from "typescript";
import {TypeExpressionCache} from "./../utils";

export class TypeChecker {
    private typeCreator: TypeExpressionCache;
    private currentSourceFile: ts.SourceFile;

    constructor(private typeChecker: ts.TypeChecker) {
    }

    setTypeCache(typeCreator: TypeExpressionCache) {
        this.typeCreator = typeCreator;
    }

    setCurrentSourceFile(node: ts.SourceFile) {
        this.currentSourceFile = node;
    }

    /* istanbul ignore next */
    getCurrentSourceFileForTesting() {
        return this.currentSourceFile;
    }

    getDeclarationFromSymbol(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null) {
            return symbol.valueDeclaration;
        }
        else {
            const declarations = symbol.getDeclarations();

            /* istanbul ignore next */
            if (declarations == null) {
                throw new Error(`Declaration should not be null for symbol: ${symbol.name}`);
            }
            else if (declarations.length > 1) {
                console.warn(`Not implemented. Symbol has more than one declaration: ${symbol.name}`);
            }
            else if (declarations.length === 0) {
                throw new Error(`Declaration length should not be 0 for symbol: ${symbol.name}`);
            }

            return declarations[0];
        }
    }

    getLocalSymbolFromNode(node: ts.Node) {
        if (node != null) {
            return (node as any)["localSymbol"] as ts.Symbol;
        }
        else {
            return null as ts.Symbol;
        }
    }

    getLocalSymbolsFromNode(node: ts.Node) {
        const locals = (node as any).locals as { [name: string]: ts.Symbol };

        /* istanbul ignore if */
        if (locals == null) {
            return [] as ts.Symbol[];
        }
        else {
            return Object.keys(locals).map(key => {
                const symbol = locals[key];
                const exportSymbol = (symbol as any).exportSymbol as ts.Symbol;

                return exportSymbol || symbol;
            });
        }
    }

    getExpressionFullText(expression: ts.Expression) {
        return (expression.getFullText(this.currentSourceFile) || "").trim();
    }

    getExtendsTypeExpressions(symbol: ts.Symbol) {
        const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);

        return symbolType.getBaseTypes().map(t => this.getTypeExpressionFromTsType(t));
    }

    getImplementsTypeExpressions(symbol: ts.Symbol) {
        /* istanbul ignore else */
        if (symbol.valueDeclaration != null) {
            const valueDeclaration = symbol.valueDeclaration as ts.ClassLikeDeclaration;
            const symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);
            const implementsIndex = symbolType.getBaseTypes().length > 0 ? 1 : 0;

            if (valueDeclaration.heritageClauses != null && valueDeclaration.heritageClauses.length > implementsIndex) {
                const types = valueDeclaration.heritageClauses[implementsIndex].types;

                /* istanbul ignore else */
                if (types != null && types.length > 0) {
                    return types.map(t => this.typeChecker.getTypeAtLocation(t))
                        .map(t => this.getTypeExpressionFromTsType(t));
                }
            }
        }

        return [];
    }

    getConstantValue(node: ts.ElementAccessExpression) {
        return this.typeChecker.getConstantValue(node);
    }

    getReturnTypeFromDeclaration(declaration: ts.Node) {
        return this.getReturnTypeFromSignature(this.typeChecker.getSignatureFromDeclaration(declaration as ts.SignatureDeclaration));
    }

    getReturnTypeFromSignature(signature: ts.Signature) {
        const tsType = this.typeChecker.getReturnTypeOfSignature(signature);

        return this.getTypeExpressionFromTsType(tsType);
    }

    getSignatureFromDeclaration(declaration: ts.SignatureDeclaration) {
        return this.typeChecker.getSignatureFromDeclaration(declaration);
    }

    getSourceFileOfSymbol(symbol: ts.Symbol) {
        let currentNode = this.getDeclarationFromSymbol(symbol).parent;

        while (currentNode != null && !this.isNodeSourceFile(currentNode)) {
            currentNode = currentNode.parent;
        }

        /* istanbul ignore if */
        if (currentNode == null) {
            throw new Error("Cound not get source file of symbol.");
        }

        return currentNode as ts.SourceFile;
    }

    getAliasedSymbol(symbol: ts.Symbol): ts.Symbol {
        if (this.symbolHasFlag(symbol, ts.SymbolFlags.Alias)) {
            return this.typeChecker.getAliasedSymbol(symbol);
        }
        else {
            return null;
        }
    }

    getSymbolAtLocation(node: ts.Node) {
        return (node as any).symbol as ts.Symbol || this.typeChecker.getSymbolAtLocation(node);
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

    getSymbolParent(symbol: ts.Symbol) {
        return symbol == null ? null : (symbol as any).parent as ts.Symbol;
    }

    getTypeExpressionAtLocation(node: ts.Node) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeAtLocation(node));
    }

    getTypeExpressionOfSymbol(symbol: ts.Symbol) {
        if (symbol.flags & ts.SymbolFlags.TypeAlias) {
            const declaration = this.getDeclarationFromSymbol(symbol) as ts.TypeAliasDeclaration;
            return this.getTypeExpressionAtLocation(declaration.type);
        }
        else {
            return this.getTypeExpressionFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.currentSourceFile));
        }
    }

    getTypeExpressionFromTsType(tsType: ts.Type) {
        return this.typeCreator.get(tsType, this.currentSourceFile);
    }

    /* istanbul ignore next */
    getTsTypeCheckerForTesting() {
        // get the type checker for testing purposes
        return this.typeChecker;
    }

    getFileImportSymbols(file: ts.SourceFile) {
        const importDeclarations = (file as any)["imports"] as ts.Node[];
        const importClauses = importDeclarations.map(d => (d.parent as ts.ImportDeclaration).importClause);
        const fileImports: ts.Symbol[] = [];

        importClauses.filter(c => c != null).forEach(c => {
            /* istanbul ignore else */
            if (c.namedBindings != null) {
                const namedBindings = (c.namedBindings as (ts.NamedImportsOrExports & ts.NamespaceImport));

                /* istanbul ignore else */
                if (namedBindings.elements != null) {
                    // named exports
                    namedBindings.elements.forEach(e => {
                        const symbol = this.typeChecker.getAliasedSymbol(this.getSymbolAtLocation(e));

                        /* istanbul ignore else */
                        if (symbol != null) {
                            fileImports.push(symbol);
                        }
                        else {
                            console.warn(`Unknown symbol: ${e.name.text}`);
                        }
                    });
                }
                else if (namedBindings.name != null) {
                    // * as exports
                    const starSymbol = this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(namedBindings.name));

                    /* istanbul ignore else */
                    if (starSymbol != null) {
                        for (const exportSymbol of this.typeChecker.getExportsOfModule(starSymbol)) {
                            fileImports.push(exportSymbol);
                        }
                    }
                    else {
                        console.warn(`Unknown symbol: ${namedBindings.name.text}`);
                    }
                }
                else {
                    console.warn(`Unknown scenario with import clause: ${c.name}`);
                }
            }
            else if (c.name != null) {
                // default exports
                fileImports.push(this.typeChecker.getAliasedSymbol(this.typeChecker.getSymbolAtLocation(c.name)));
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
                if (!this.isSymbolNamedExportOfFile(exportSymbol, file) && !this.isSymbolDefaultExportOfFile(exportSymbol, file)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports;
    }

    isNodeSourceFile(node: ts.Node) {
        return typeof (node as ts.SourceFile).fileName === "string";
    }

    isSymbolExportOfParent(symbol: ts.Symbol) {
        let parentSymbol = this.getSymbolParent(symbol);

        if (parentSymbol == null) {
            const sourceFile = this.getSourceFileOfSymbol(symbol);
            return this.isSymbolDefaultExportOfFile(symbol, sourceFile);
        }
        else {
            return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports[symbol.name] != null;
        }
    }

    isSymbolNamedExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);

        // when a file doesn't have exports the symbol will be null
        return fileSymbol != null && fileSymbol.exports[symbol.name] != null && symbol.name !== "default";
    }

    isSymbolDefaultExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);
        let isDefaultExportOfFile = false;

        if (fileSymbol != null) {
            const defaultExport = fileSymbol.exports["default"];

            if (defaultExport != null) {
                isDefaultExportOfFile = defaultExport === symbol || this.getAliasedSymbol(defaultExport) === symbol;
            }
        }

        return isDefaultExportOfFile;
    }

    typeToString(tsType: ts.Type) {
        const formatFlags = ts.TypeFormatFlags.UseTypeOfFunction | ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType |
            ts.TypeFormatFlags.WriteTypeArgumentsOfSignature;
        return this.typeChecker.typeToString(tsType, this.currentSourceFile, formatFlags);
    }

    symbolHasFlag(symbol: ts.Symbol, flag: ts.SymbolFlags) {
        return (symbol.getFlags() & flag) !== 0;
    }

    getSyntaxKindAsString(kind: ts.SyntaxKind) {
        return (ts as any).SyntaxKind[kind] as string;
    }
}
