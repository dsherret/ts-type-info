var TypedDefinition = (function () {
    function TypedDefinition() {
    }
    TypedDefinition.prototype.fillTypeExpression = function (typeChecker, symbol) {
        this._typeExpression = typeChecker.getTypeOfSymbol(symbol);
    };
    Object.defineProperty(TypedDefinition.prototype, "typeExpression", {
        get: function () {
            return this._typeExpression;
        },
        enumerable: true,
        configurable: true
    });
    return TypedDefinition;
})();
exports.TypedDefinition = TypedDefinition;

//# sourceMappingURL=typed-definition.js.map
