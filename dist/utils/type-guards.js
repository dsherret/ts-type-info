var TypeGuards;
(function (TypeGuards) {
    function isCallExpression(expression) {
        return expression != null && expression.arguments != null;
    }
    TypeGuards.isCallExpression = isCallExpression;
    function isLiteralExpression(expression) {
        return expression != null && expression.text != null;
    }
    TypeGuards.isLiteralExpression = isLiteralExpression;
})(/* istanbul ignore next */TypeGuards = exports.TypeGuards || (exports.TypeGuards = {}));

//# sourceMappingURL=type-guards.js.map
