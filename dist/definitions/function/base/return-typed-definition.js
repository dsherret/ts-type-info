var ReturnTypedDefinition = (function () {
    function ReturnTypedDefinition() {
    }
    ReturnTypedDefinition.prototype.fillReturnTypeExpressionBySymbol = function (typeChecker, symbol) {
        this._returnTypeExpression = typeChecker.getReturnTypeFromSymbol(symbol);
    };
    ReturnTypedDefinition.prototype.fillReturnTypeExpressionBySignature = function (typeChecker, signature) {
        this._returnTypeExpression = typeChecker.getReturnTypeFromSignature(signature);
    };
    Object.defineProperty(ReturnTypedDefinition.prototype, "returnTypeExpression", {
        get: function () {
            return this._returnTypeExpression;
        },
        enumerable: true,
        configurable: true
    });
    return ReturnTypedDefinition;
})();
exports.ReturnTypedDefinition = ReturnTypedDefinition;

//# sourceMappingURL=return-typed-definition.js.map
