var ReturnTypedDefinition = (function () {
    function ReturnTypedDefinition() {
    }
    ReturnTypedDefinition.prototype.fillReturnTypeBySymbol = function (typeChecker, symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    };
    ReturnTypedDefinition.prototype.fillReturnTypeBySignature = function (typeChecker, signature) {
        this._returnType = typeChecker.getReturnTypeFromSignature(signature);
    };
    Object.defineProperty(ReturnTypedDefinition.prototype, "returnType", {
        get: function () {
            return this._returnType;
        },
        enumerable: true,
        configurable: true
    });
    return ReturnTypedDefinition;
})();
exports.ReturnTypedDefinition = ReturnTypedDefinition;

//# sourceMappingURL=return-typed-definition.js.map
