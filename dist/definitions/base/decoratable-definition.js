var decorator_definition_1 = require("./../decorator-definition");
var DecoratableDefinition = (function () {
    function DecoratableDefinition() {
    }
    DecoratableDefinition.prototype.fillDecorators = function (symbol) {
        this._decorators = [];
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (var _i = 0, _a = symbol.valueDeclaration.decorators; _i < _a.length; _i++) {
                var decorator = _a[_i];
                this._decorators.push(new decorator_definition_1.DecoratorDefinition(decorator));
            }
        }
    };
    Object.defineProperty(DecoratableDefinition.prototype, "decorators", {
        get: function () {
            return this._decorators;
        },
        enumerable: true,
        configurable: true
    });
    return DecoratableDefinition;
})();
exports.DecoratableDefinition = DecoratableDefinition;

//# sourceMappingURL=decoratable-definition.js.map
