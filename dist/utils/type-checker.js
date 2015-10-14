var types_1 = require("./../types");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
    }
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        return node.symbol;
    };
    TypeChecker.prototype.getTypeOfSymbol = function (symbol) {
        return new types_1.Type(this.typeChecker, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    };
    TypeChecker.prototype.getSymbolsInScope = function (node, flags) {
        return this.typeChecker.getSymbolsInScope(node, flags);
    };
    TypeChecker.prototype.getFullyQualifiedName = function (symbol) {
        return this.typeChecker.getFullyQualifiedName(symbol);
    };
    TypeChecker.prototype.getBaseTypeSymbols = function (classSymbol) {
        return this.typeChecker.getBaseTypes(this.getTypeOfSymbol(classSymbol).tsType).map(function (baseTypes) {
            return baseTypes.symbol;
        });
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;

//# sourceMappingURL=type-checker.js.map
