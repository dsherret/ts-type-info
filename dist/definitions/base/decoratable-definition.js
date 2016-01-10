var misc_1 = require("./../misc");
var DecoratableDefinition = (function () {
    function DecoratableDefinition() {
    }
    DecoratableDefinition.prototype.fillDecorators = function (typeChecker, symbol) {
        this._decorators = [];
        for (var _i = 0, _a = symbol.getDeclarations(); _i < _a.length; _i++) {
            var declaration = _a[_i];
            if (declaration.decorators != null) {
                for (var _b = 0, _c = declaration.decorators; _b < _c.length; _b++) {
                    var decorator = _c[_b];
                    this._decorators.push(new misc_1.DecoratorDefinition(typeChecker, decorator));
                }
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
