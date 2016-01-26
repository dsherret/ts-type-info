import * as ts from "typescript";
import {TypeExpressionCache} from "./../utils";

// this is just what I've found works. There are some hacky solutions in here.

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

    getLocalSymbolsFromDeclaration(declaration: ts.Declaration) {
        const locals = (declaration as any).locals as { [name: string]: ts.Symbol };

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

    getConstantValue(symbol: ts.Symbol) {
        return this.typeChecker.getConstantValue(symbol.valueDeclaration as any);
    }

    getFunctionTypeParameterSymbols(symbol: ts.Symbol) {
        const declaration = symbol.valueDeclaration as ts.ClassLikeDeclaration;

        return (declaration.typeParameters || []).map(p => this.getSymbolAtLocation(p));
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

    getSymbolParent(symbol: ts.Symbol) {
        return symbol == null ? null : (symbol as any).parent as ts.Symbol;
    }

    getSymbolParametersFromSymbol(symbol: ts.Symbol) {
        return (this.getDeclarationFromSymbol(symbol) as ts.SignatureDeclaration).parameters.filter(p => p != null).map(p => this.getSymbolAtLocation(p));
    }

    getTypeExpressionAtLocation(node: ts.Node) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeAtLocation(node));
    }

    getTypeExpressionOfSymbol(symbol: ts.Symbol) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.currentSourceFile));
    }

    getTypeExpressionFromTsType(tsType: ts.Type) {
        return this.typeCreator.get(tsType);
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
                if (!this.isSymbolExportOfFile(exportSymbol, file)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }

        return fileReExports;
    }

    isNodeSourceFile(node: ts.Node) {
        return typeof (node as ts.SourceFile).fileName === "string";
    }

    isSymbolInFile(symbol: ts.Symbol, file: ts.SourceFile) {
        return this.getSourceFileOfSymbol(symbol).fileName === file.fileName;
    }

    isSymbolExportOfParent(symbol: ts.Symbol) {
        let parentSymbol = this.getSymbolParent(symbol);

        return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports[symbol.name] != null;
    }

    isSymbolExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);

        // when a file doesn't have exports the symbol will be null
        return fileSymbol != null && fileSymbol.exports[symbol.name] != null;
    }

    isSymbolClass(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Class);
    }

    isSymbolClassMethod(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Method);
    }

    isSymbolClassProperty(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Property) ||
            this.symbolHasFlag(symbol, ts.SymbolFlags.GetAccessor);
    }

    isSymbolConstructor(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Constructor);
    }

    isSymbolEnum(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Enum);
    }

    isEnumMemberSymbol(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.EnumMember);
    }

    isSymbolFunction(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Function);
    }

    isSymbolVariable(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Variable) ||
            this.symbolHasFlag(symbol, ts.SymbolFlags.BlockScopedVariable) ||
            this.symbolHasFlag(symbol, ts.SymbolFlags.FunctionScopedVariable);
    }

    isSymbolInterface(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Interface);
    }

    isSymbolInterfaceMethod(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Method);
    }

    isSymbolNamespace(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Namespace);
    }

    isSymbolNewSignature(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Signature);
    }

    isSymbolProperty(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Property);
    }

    isSymbolStaticMethod(symbol: ts.Symbol) {
        // could be a function for value modules (see value-module-tests.ts)
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Method) ||
            this.symbolHasFlag(symbol, ts.SymbolFlags.Function);
    }

    isSymbolStaticProperty(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.Property);
    }

    isSymbolTypeParameter(symbol: ts.Symbol) {
        return this.symbolHasFlag(symbol, ts.SymbolFlags.TypeParameter);
    }

    typeToString(tsType: ts.Type) {
        return this.typeChecker.typeToString(tsType, this.currentSourceFile, ts.TypeFormatFlags.UseTypeOfFunction | ts.TypeFormatFlags.NoTruncation);
    }

    private symbolHasFlag(symbol: ts.Symbol, flag: ts.SymbolFlags) {
        return (symbol.getFlags() & flag) !== 0;
    }
}
