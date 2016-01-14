var TypeExpressionedDefinition = (function () {
    function TypeExpressionedDefinition() {
    }
    TypeExpressionedDefinition.prototype.fillTypeExpression = function (typeChecker, symbol) {
        this._typeExpression = typeChecker.getTypeExpressionOfSymbol(symbol);
    };
    Object.defineProperty(TypeExpressionedDefinition.prototype, "typeExpression", {
        get: function () {
            return this._typeExpression;
        },
        enumerable: true,
        configurable: true
    });
    return TypeExpressionedDefinition;
})();
exports.TypeExpressionedDefinition = TypeExpressionedDefinition;

//# sourceMappingURL=type-expressioned-definition.js.map
