var ts = require("typescript");
// this is just what I've found works. There are some hacky solutions in here.
var TypeChecker = (function () {
    function TypeChecker(typeChecker) {
        this.typeChecker = typeChecker;
    }
    TypeChecker.prototype.setTypeCache = function (typeCreator) {
        this.typeCreator = typeCreator;
    };
    TypeChecker.prototype.setCurrentSourceFile = function (node) {
        this.currentSourceFile = node;
    };
    /* istanbul ignore next */
    TypeChecker.prototype.getCurrentSourceFileForTesting = function () {
        return this.currentSourceFile;
    };
    TypeChecker.prototype.getDeclarationFromSymbol = function (symbol) {
        if (symbol.valueDeclaration != null) {
            return symbol.valueDeclaration;
        }
        else {
            var declarations = symbol.getDeclarations();
            /* istanbul ignore next */
            if (declarations == null) {
                throw new Error("Declaration should not be null for symbol: " + symbol.name);
            }
            else if (declarations.length > 1) {
                console.warn("Not implemented. Symbol has more than one declaration: " + symbol.name);
            }
            else if (declarations.length === 0) {
                throw new Error("Declaration length should not be 0 for symbol: " + symbol.name);
            }
            return declarations[0];
        }
    };
    TypeChecker.prototype.getLocalSymbolsFromDeclaration = function (declaration) {
        var locals = declaration.locals;
        /* istanbul ignore if */
        if (locals == null) {
            return [];
        }
        else {
            return Object.keys(locals).map(function (key) {
                var symbol = locals[key];
                var exportSymbol = symbol.exportSymbol;
                return exportSymbol || symbol;
            });
        }
    };
    TypeChecker.prototype.getExpressionFullText = function (expression) {
        return (expression.getFullText(this.currentSourceFile) || "").trim();
    };
    TypeChecker.prototype.getExtendsTypeExpressions = function (symbol) {
        var _this = this;
        var symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);
        return symbolType.getBaseTypes().map(function (t) { return _this.getTypeExpressionFromTsType(t); });
    };
    TypeChecker.prototype.getImplementsTypeExpressions = function (symbol) {
        var _this = this;
        /* istanbul ignore else */
        if (symbol.valueDeclaration != null) {
            var valueDeclaration = symbol.valueDeclaration;
            var symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);
            var implementsIndex = symbolType.getBaseTypes().length > 0 ? 1 : 0;
            if (valueDeclaration.heritageClauses != null && valueDeclaration.heritageClauses.length > implementsIndex) {
                var types = valueDeclaration.heritageClauses[implementsIndex].types;
                /* istanbul ignore else */
                if (types != null && types.length > 0) {
                    return types.map(function (t) { return _this.typeChecker.getTypeAtLocation(t); })
                        .map(function (t) { return _this.getTypeExpressionFromTsType(t); });
                }
            }
        }
        return [];
    };
    TypeChecker.prototype.getConstantValue = function (symbol) {
        return this.typeChecker.getConstantValue(symbol.valueDeclaration);
    };
    TypeChecker.prototype.getFunctionTypeParameterSymbols = function (symbol) {
        var _this = this;
        var declaration = symbol.valueDeclaration;
        return (declaration.typeParameters || []).map(function (p) { return _this.getSymbolAtLocation(p); });
    };
    TypeChecker.prototype.getMinArgumentCount = function (signature) {
        return signature["minArgumentCount"];
    };
    TypeChecker.prototype.getReturnTypeFromSymbol = function (symbol) {
        var signature = this.typeChecker.getSignatureFromDeclaration(symbol.valueDeclaration);
        return this.getReturnTypeFromSignature(signature);
    };
    TypeChecker.prototype.getReturnTypeFromSignature = function (signature) {
        var tsType = this.typeChecker.getReturnTypeOfSignature(signature);
        return this.getTypeExpressionFromTsType(tsType);
    };
    TypeChecker.prototype.getSignatureFromDeclaration = function (declaration) {
        return this.typeChecker.getSignatureFromDeclaration(declaration);
    };
    TypeChecker.prototype.getSourceFileOfSymbol = function (symbol) {
        var currentNode = this.getDeclarationFromSymbol(symbol).parent;
        while (currentNode != null && !this.isNodeSourceFile(currentNode)) {
            currentNode = currentNode.parent;
        }
        /* istanbul ignore if */
        if (currentNode == null) {
            throw new Error("Cound not get source file of symbol.");
        }
        return currentNode;
    };
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        return node.symbol;
    };
    TypeChecker.prototype.getSymbolsFromType = function (type) {
        var typeArray = type.types;
        if (typeArray != null) {
            return typeArray.map(function (t) { return t.symbol; }).filter(function (s) { return s != null; });
        }
        else if (type.symbol != null) {
            return [type.symbol];
        }
        else {
            return [];
        }
    };
    TypeChecker.prototype.getSymbolsInScope = function (node, flags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    };
    TypeChecker.prototype.getSymbolParent = function (symbol) {
        return symbol == null ? null : symbol.parent;
    };
    TypeChecker.prototype.getSymbolParametersFromSymbol = function (symbol) {
        var _this = this;
        return this.getDeclarationFromSymbol(symbol).parameters.filter(function (p) { return p != null; }).map(function (p) { return _this.getSymbolAtLocation(p); });
    };
    TypeChecker.prototype.getTypeExpressionAtLocation = function (node) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeAtLocation(node));
    };
    TypeChecker.prototype.getTypeExpressionOfSymbol = function (symbol) {
        return this.getTypeExpressionFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.currentSourceFile));
    };
    TypeChecker.prototype.getTypeExpressionFromTsType = function (tsType) {
        return this.typeCreator.get(tsType);
    };
    /* istanbul ignore next */
    TypeChecker.prototype.getTsTypeCheckerForTesting = function () {
        // get the type checker for testing purposes
        return this.typeChecker;
    };
    TypeChecker.prototype.getFileImportSymbols = function (file) {
        var _this = this;
        var importDeclarations = file["imports"];
        var importClauses = importDeclarations.map(function (d) { return d.parent.importClause; });
        var fileImports = [];
        importClauses.filter(function (c) { return c != null; }).forEach(function (c) {
            /* istanbul ignore else */
            if (c.namedBindings != null) {
                var namedBindings = c.namedBindings;
                /* istanbul ignore else */
                if (namedBindings.elements != null) {
                    // named exports
                    namedBindings.elements.forEach(function (e) {
                        var symbol = _this.typeChecker.getAliasedSymbol(_this.getSymbolAtLocation(e));
                        /* istanbul ignore else */
                        if (symbol != null) {
                            fileImports.push(symbol);
                        }
                        else {
                            console.warn("Unknown symbol: " + e.name.text);
                        }
                    });
                }
                else if (namedBindings.name != null) {
                    // * as exports
                    var starSymbol = _this.typeChecker.getAliasedSymbol(_this.typeChecker.getSymbolAtLocation(namedBindings.name));
                    /* istanbul ignore else */
                    if (starSymbol != null) {
                        for (var _i = 0, _a = _this.typeChecker.getExportsOfModule(starSymbol); _i < _a.length; _i++) {
                            var exportSymbol = _a[_i];
                            fileImports.push(exportSymbol);
                        }
                    }
                    else {
                        console.warn("Unknown symbol: " + namedBindings.name.text);
                    }
                }
                else {
                    console.warn("Unknown scenario with import clause: " + c.name);
                }
            }
            else if (c.name != null) {
                // default exports
                fileImports.push(_this.typeChecker.getTypeAtLocation(c).symbol);
            }
            else {
                console.warn("Unknown import clause in " + file.fileName);
            }
        });
        return fileImports;
    };
    TypeChecker.prototype.getFileReExportSymbols = function (file) {
        var fileSymbol = this.getSymbolAtLocation(file);
        var fileReExports = [];
        // when a file doesn't have exports the symbol will be null
        if (fileSymbol != null) {
            for (var _i = 0, _a = this.typeChecker.getExportsOfModule(fileSymbol); _i < _a.length; _i++) {
                var exportSymbol = _a[_i];
                if (!this.isSymbolExportOfFile(exportSymbol, file)) {
                    fileReExports.push(exportSymbol);
                }
            }
        }
        return fileReExports;
    };
    TypeChecker.prototype.isNodeSourceFile = function (node) {
        return typeof node.fileName === "string";
    };
    TypeChecker.prototype.isSymbolInFile = function (symbol, file) {
        return this.getSourceFileOfSymbol(symbol).fileName === file.fileName;
    };
    TypeChecker.prototype.isSymbolExportOfParent = function (symbol) {
        var parentSymbol = this.getSymbolParent(symbol);
        return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports[symbol.name] != null;
    };
    TypeChecker.prototype.isSymbolExportOfFile = function (symbol, file) {
        var fileSymbol = this.getSymbolAtLocation(file);
        // when a file doesn't have exports the symbol will be null
        return fileSymbol != null && fileSymbol.exports[symbol.name] != null;
    };
    TypeChecker.prototype.isSymbolClass = function (symbol) {
        return this.symbolHasFlag(symbol, 32 /* Class */);
    };
    TypeChecker.prototype.isSymbolClassMethod = function (symbol) {
        return this.symbolHasFlag(symbol, 8192 /* Method */);
    };
    TypeChecker.prototype.isSymbolClassProperty = function (symbol) {
        return this.symbolHasFlag(symbol, 4 /* Property */) ||
            this.symbolHasFlag(symbol, 32768 /* GetAccessor */);
    };
    TypeChecker.prototype.isSymbolConstructor = function (symbol) {
        return this.symbolHasFlag(symbol, 16384 /* Constructor */);
    };
    TypeChecker.prototype.isSymbolEnum = function (symbol) {
        return this.symbolHasFlag(symbol, 384 /* Enum */);
    };
    TypeChecker.prototype.isSymbolFunction = function (symbol) {
        return this.symbolHasFlag(symbol, 16 /* Function */);
    };
    TypeChecker.prototype.isSymbolVariable = function (symbol) {
        return this.symbolHasFlag(symbol, 2 /* BlockScopedVariable */) ||
            this.symbolHasFlag(symbol, 3 /* Variable */);
    };
    TypeChecker.prototype.isSymbolInterface = function (symbol) {
        return this.symbolHasFlag(symbol, 64 /* Interface */);
    };
    TypeChecker.prototype.isSymbolInterfaceMethod = function (symbol) {
        return this.symbolHasFlag(symbol, 8192 /* Method */);
    };
    TypeChecker.prototype.isSymbolNamespace = function (symbol) {
        return this.symbolHasFlag(symbol, 1536 /* Namespace */);
    };
    TypeChecker.prototype.isSymbolNewSignature = function (symbol) {
        return this.symbolHasFlag(symbol, 131072 /* Signature */);
    };
    TypeChecker.prototype.isSymbolProperty = function (symbol) {
        return this.symbolHasFlag(symbol, 4 /* Property */);
    };
    TypeChecker.prototype.isSymbolStaticMethod = function (symbol) {
        // could be a function for value modules (see value-module-tests.ts)
        return this.symbolHasFlag(symbol, 8192 /* Method */) ||
            this.symbolHasFlag(symbol, 16 /* Function */);
    };
    TypeChecker.prototype.isSymbolStaticProperty = function (symbol) {
        return this.symbolHasFlag(symbol, 4 /* Property */);
    };
    TypeChecker.prototype.isSymbolTypeParameter = function (symbol) {
        return this.symbolHasFlag(symbol, 262144 /* TypeParameter */);
    };
    TypeChecker.prototype.typeToString = function (tsType) {
        return this.typeChecker.typeToString(tsType, this.currentSourceFile, 2 /* UseTypeOfFunction */);
    };
    TypeChecker.prototype.symbolHasFlag = function (symbol, flag) {
        return (symbol.getFlags() & flag) !== 0;
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;

//# sourceMappingURL=type-checker.js.map
