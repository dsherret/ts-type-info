var Expression = (function () {
    function Expression(typeChecker, expression) {
        this.text = typeChecker.getExpressionFullText(expression);
    }
    return Expression;
})();
exports.Expression = Expression;

//# sourceMappingURL=expression.js.map
