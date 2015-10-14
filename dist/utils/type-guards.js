var TypeGuards = (function () {
    function TypeGuards() {
    }
    TypeGuards.isCallExpression = function (expression) {
        return expression != null && expression.arguments != null;
    };
    TypeGuards.isLiteralExpression = function (expression) {
        return expression != null && expression.text != null;
    };
    return TypeGuards;
})();
exports.TypeGuards = TypeGuards;

//# sourceMappingURL=type-guards.js.map
