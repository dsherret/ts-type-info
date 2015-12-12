var TypedDefinition = (function () {
    function TypedDefinition() {
    }
    TypedDefinition.prototype.fillType = function (typeChecker, symbol) {
        this._type = typeChecker.getTypeOfSymbol(symbol);
    };
    Object.defineProperty(TypedDefinition.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return TypedDefinition;
})();
exports.TypedDefinition = TypedDefinition;

//# sourceMappingURL=typed-definition.js.map
