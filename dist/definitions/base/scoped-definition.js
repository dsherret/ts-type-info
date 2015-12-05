var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var ts = require("typescript");
var scope_1 = require("./../../scope");
var utils_1 = require("./../../utils");
var ScopedDefinition = (function () {
    function ScopedDefinition() {
    }
    ScopedDefinition.prototype.fillScope = function (symbol) {
        if ((symbol.valueDeclaration.flags & 32) !== 0) {
            this._scope = scope_1.Scope.private;
        }
        else if ((symbol.valueDeclaration.flags & 64) !== 0) {
            this._scope = scope_1.Scope.protected;
        }
        else {
            this._scope = scope_1.Scope.public;
        }
    };
    Object.defineProperty(ScopedDefinition.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScopedDefinition.prototype, "scope",
        __decorate([
            utils_1.Serializable
        ], ScopedDefinition.prototype, "scope", Object.getOwnPropertyDescriptor(ScopedDefinition.prototype, "scope")));
    return ScopedDefinition;
})();
exports.ScopedDefinition = ScopedDefinition;

//# sourceMappingURL=scoped-definition.js.map
