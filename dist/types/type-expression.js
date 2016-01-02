var TypeExpression = (function () {
    function TypeExpression(typeChecker, _tsType) {
        this._tsType = _tsType;
        this._types = [];
        this._text = typeChecker.typeToString(_tsType);
    }
    TypeExpression.prototype.addType = function (type) {
        this._types.push(type);
    };
    Object.defineProperty(TypeExpression.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeExpression.prototype, "types", {
        get: function () {
            return this._types;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeExpression.prototype, "tsType", {
        get: function () {
            return this._tsType;
        },
        enumerable: true,
        configurable: true
    });
    return TypeExpression;
})();
exports.TypeExpression = TypeExpression;

//# sourceMappingURL=type-expression.js.map
