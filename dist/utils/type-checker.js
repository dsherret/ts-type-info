var ts = require("typescript");
var utils_1 = require("./../utils");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
        this.typeCreator = new utils_1.TypeCreator(this);
    }
    TypeChecker.prototype.getExtendsSymbols = function (symbol) {
        var symbolType = this.typeChecker.getDeclaredTypeOfSymbol(symbol);
        return symbolType.getBaseTypes().map(function (baseType) {
            return baseType.symbol;
        });
    };
    TypeChecker.prototype.getImplementsSymbols = function (symbol) {
        var _this = this;
        if (symbol.valueDeclaration != null) {
            var valueDeclaration = symbol.valueDeclaration;
            if (valueDeclaration.heritageClauses != null && valueDeclaration.heritageClauses.length > 0) {
                if (valueDeclaration.heritageClauses[0].types != null && valueDeclaration.heritageClauses[0].types.length > 0) {
                    return valueDeclaration.heritageClauses[0].types.map(function (t) { return _this.typeChecker.getSymbolAtLocation(t.expression); });
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
    TypeChecker.prototype.getFullyQualifiedName = function (symbol) {
        return this.typeChecker.getFullyQualifiedName(symbol);
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
        return this.getTypeFromTsType(tsType);
    };
    TypeChecker.prototype.getSignatureFromDeclaration = function (declaration) {
        return this.typeChecker.getSignatureFromDeclaration(declaration);
    };
    TypeChecker.prototype.getSourceFileOfSymbol = function (symbol) {
        var currentNode = (symbol.valueDeclaration || symbol.getDeclarations()[0]).parent;
        while (currentNode != null && typeof currentNode.fileName !== "string") {
            currentNode = currentNode.parent;
        }
        if (currentNode == null) {
            throw new Error("Error getting source file of symbol.");
        }
        return currentNode;
    };
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        return node.symbol;
    };
    TypeChecker.prototype.getSymbolsInScope = function (node, flags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    };
    TypeChecker.prototype.getTypeAtLocation = function (node) {
        return this.getTypeFromTsType(this.typeChecker.getTypeAtLocation(node));
    };
    TypeChecker.prototype.getTypeOfSymbol = function (symbol) {
        return this.getTypeFromTsType(this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node));
    };
    TypeChecker.prototype.getTypeCheckerForTesting = function () {
        return this.typeChecker;
    };
    TypeChecker.prototype.getTypeFromTsType = function (tsType) {
        return this.typeCreator.get(tsType);
    };
    TypeChecker.prototype.getFileImportSymbols = function (file) {
        var _this = this;
        var importDeclarations = file["imports"];
        var importClauses = importDeclarations.map(function (d) { return d.parent.importClause; });
        var fileImports = [];
        importClauses.filter(function (c) { return c != null; }).forEach(function (c) {
            if (c.namedBindings != null) {
                var namedBindings = c.namedBindings;
                if (namedBindings.elements != null) {
                    namedBindings.elements.forEach(function (e) {
                        var symbol = _this.typeChecker.getAliasedSymbol(_this.getSymbolAtLocation(e));
                        if (symbol == null) {
                            console.warn("Unknown symbol: " + e.name.text);
                        }
                        else {
                            fileImports.push(symbol);
                        }
                    });
                }
                else if (namedBindings.name != null) {
                    var starSymbol = _this.typeChecker.getAliasedSymbol(_this.typeChecker.getSymbolAtLocation(namedBindings.name));
                    if (starSymbol == null) {
                        console.warn("Unknown symbol: " + namedBindings.name.text);
                    }
                    else {
                        for (var _i = 0, _a = _this.typeChecker.getExportsOfModule(starSymbol); _i < _a.length; _i++) {
                            var exportSymbol = _a[_i];
                            fileImports.push(exportSymbol);
                        }
                    }
                }
            }
            else if (c.name != null) {
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
    TypeChecker.prototype.isOptionalProperty = function (symbol) {
        return symbol.valueDeclaration != null && symbol.valueDeclaration.questionToken != null;
    };
    TypeChecker.prototype.isSymbolInFile = function (symbol, file) {
        return this.getSourceFileOfSymbol(symbol).fileName === file.fileName;
    };
    TypeChecker.prototype.isSymbolExportOfFile = function (symbol, file) {
        var fileSymbol = this.getSymbolAtLocation(file);
        return fileSymbol != null && fileSymbol.exports[symbol.name] != null;
    };
    TypeChecker.prototype.typeToString = function (tsType) {
        return this.typeChecker.typeToString(tsType, this.node, 0);
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;

//# sourceMappingURL=type-checker.js.map
