var expressions_1 = require("./../../expressions");
var DefaultExpressionedDefinition = (function () {
    /* istanbul ignore next */ function DefaultExpressionedDefinition() {
    }
    DefaultExpressionedDefinition.prototype.fillDefaultExpression = function (typeChecker, symbol) {
        var declaration = typeChecker.getDeclarationFromSymbol(symbol);
        this.defaultExpression = declaration.initializer != null ? new expressions_1.Expression(typeChecker, declaration.initializer) : null;
    };
    return DefaultExpressionedDefinition;
})();
exports.DefaultExpressionedDefinition = DefaultExpressionedDefinition;

//# sourceMappingURL=default-expressioned-definition.js.map
