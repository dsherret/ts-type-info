var Expression = (function () {
    function Expression(typeChecker, expression) {
        this._text = typeChecker.getExpressionFullText(expression);
    }
    Object.defineProperty(Expression.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    return Expression;
})();
exports.Expression = Expression;

//# sourceMappingURL=expression.js.map
