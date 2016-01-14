var decorator_definition_1 = require("./decorator-definition");
var DecoratableDefinition = (function () {
    function DecoratableDefinition() {
    }
    DecoratableDefinition.prototype.fillDecorators = function (typeChecker, symbol) {
        this.decorators = [];
        for (var _i = 0, _a = symbol.getDeclarations(); _i < _a.length; _i++) {
            var declaration = _a[_i];
            if (declaration.decorators != null) {
                for (var _b = 0, _c = declaration.decorators; _b < _c.length; _b++) {
                    var decorator = _c[_b];
                    this.decorators.push(new decorator_definition_1.DecoratorDefinition(typeChecker, decorator));
                }
            }
        }
    };
    return DecoratableDefinition;
})();
exports.DecoratableDefinition = DecoratableDefinition;

//# sourceMappingURL=decoratable-definition.js.map
