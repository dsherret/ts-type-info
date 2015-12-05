var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var definitions_1 = require("./../../definitions");
var utils_1 = require("./../../utils");
var DecoratedDefinition = (function () {
    function DecoratedDefinition() {
    }
    DecoratedDefinition.prototype.fillDecorators = function (symbol) {
        this._decorators = [];
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (var _i = 0, _a = symbol.valueDeclaration.decorators; _i < _a.length; _i++) {
                var decorator = _a[_i];
                this._decorators.push(new definitions_1.DecoratorDefinition(decorator));
            }
        }
    };
    Object.defineProperty(DecoratedDefinition.prototype, "decorators", {
        get: function () {
            return this._decorators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecoratedDefinition.prototype, "decorators",
        __decorate([
            utils_1.Serializable
        ], DecoratedDefinition.prototype, "decorators", Object.getOwnPropertyDescriptor(DecoratedDefinition.prototype, "decorators")));
    return DecoratedDefinition;
})();
exports.DecoratedDefinition = DecoratedDefinition;

//# sourceMappingURL=decorated-definition.js.map
