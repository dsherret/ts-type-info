var NamedDefinition = (function () {
    function NamedDefinition() {
    }
    NamedDefinition.prototype.fillName = function (symbol) {
        this._name = symbol.getName();
    };
    Object.defineProperty(NamedDefinition.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return NamedDefinition;
})();
exports.NamedDefinition = NamedDefinition;

//# sourceMappingURL=named-definition.js.map
