var ReturnTypedDefinition = (function () {
    function ReturnTypedDefinition() {
    }
    ReturnTypedDefinition.prototype.fillReturnTypeExpressionBySymbol = function (typeChecker, symbol) {
        this.returnTypeExpression = typeChecker.getReturnTypeFromSymbol(symbol);
    };
    ReturnTypedDefinition.prototype.fillReturnTypeExpressionBySignature = function (typeChecker, signature) {
        this.returnTypeExpression = typeChecker.getReturnTypeFromSignature(signature);
    };
    return ReturnTypedDefinition;
})();
exports.ReturnTypedDefinition = ReturnTypedDefinition;

//# sourceMappingURL=return-typed-definition.js.map
