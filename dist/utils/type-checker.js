var ts = require("typescript");
var types_1 = require("./../types");
var utils_1 = require("./../utils");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
        this.typeCache = new utils_1.KeyValueCache();
    }
    TypeChecker.prototype.getBaseTypeSymbols = function (classSymbol) {
        return this.typeChecker.getBaseTypes(this.getTypeOfSymbol(classSymbol).tsType).map(function (baseTypes) {
            return baseTypes.symbol;
        });
    };
    TypeChecker.prototype.getFullyQualifiedName = function (symbol) {
        return this.typeChecker.getFullyQualifiedName(symbol);
    };
    TypeChecker.prototype.getReturnTypeFromSymbol = function (symbol) {
        var signature = this.typeChecker.getSignatureFromDeclaration(symbol.valueDeclaration);
        return this.getReturnTypeFromSignature(signature);
    };
    TypeChecker.prototype.getReturnTypeFromSignature = function (signature) {
        var tsType = this.typeChecker.getReturnTypeOfSignature(signature);
        return this.getTypeFromTsType(tsType);
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
    TypeChecker.prototype.typeToString = function (tsType) {
        return this.typeChecker.typeToString(tsType, this.node, 0);
    };
    TypeChecker.prototype.getMinArgumentCount = function (signature) {
        return signature["minArgumentCount"];
    };
    TypeChecker.prototype.getTypeFromTsType = function (tsType) {
        var type = this.typeCache.get(tsType);
        if (type == null) {
            type = new types_1.Type(this, tsType);
            this.typeCache.add(tsType, type);
        }
        return type;
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;
