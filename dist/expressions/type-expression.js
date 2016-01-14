var TypeExpression = (function () {
    function TypeExpression(typeChecker, tsType) {
        this.types = [];
        this.text = typeChecker.typeToString(tsType);
    }
    TypeExpression.prototype.addType = function (type) {
        this.types.push(type);
    };
    return TypeExpression;
})();
exports.TypeExpression = TypeExpression;

//# sourceMappingURL=type-expression.js.map
