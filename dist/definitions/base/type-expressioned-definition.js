var TypeExpressionedDefinition = (function () {
    /* istanbul ignore next */ function TypeExpressionedDefinition() {
    }
    TypeExpressionedDefinition.prototype.fillTypeExpression = function (typeChecker, symbol) {
        this.typeExpression = typeChecker.getTypeExpressionOfSymbol(symbol);
    };
    return TypeExpressionedDefinition;
})();
exports.TypeExpressionedDefinition = TypeExpressionedDefinition;

//# sourceMappingURL=type-expressioned-definition.js.map
