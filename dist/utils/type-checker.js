var types_1 = require("./../types");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
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
        var tsType = this.typeChecker.getReturnTypeOfSignature(signature);
        return new types_1.Type(this.typeChecker, tsType, this.node);
    };
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        return node.symbol;
    };
    TypeChecker.prototype.getSymbolsInScope = function (node, flags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    };
    TypeChecker.prototype.getTypeOfSymbol = function (symbol) {
        return new types_1.Type(this.typeChecker, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    };
    TypeChecker.prototype.getTypeCheckerForTesting = function () {
        return this.typeChecker;
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;
