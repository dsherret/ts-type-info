var ts = require("typescript");
var utils_1 = require("./../utils");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
        this.typeCreator = new utils_1.TypeCreator(this);
    }
    TypeChecker.prototype.getBaseTypeSymbols = function (classSymbol) {
        return this.typeChecker.getBaseTypes(this.getTypeOfSymbol(classSymbol).tsType).map(function (baseTypes) {
            return baseTypes.symbol;
        });
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
    TypeChecker.prototype.getSourceFileOfSymbol = function (symbol) {
        var currentNode = symbol.valueDeclaration.parent;
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
