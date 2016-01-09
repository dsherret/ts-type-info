var ts = require("typescript");
var scope_1 = require("./../../scope");
var ScopedDefinition = (function () {
    function ScopedDefinition() {
    }
    ScopedDefinition.prototype.fillScope = function (symbol) {
        if ((symbol.valueDeclaration.flags & 32 /* Private */) !== 0) {
            this._scope = scope_1.Scope.private;
        }
        else if ((symbol.valueDeclaration.flags & 64 /* Protected */) !== 0) {
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
    return ScopedDefinition;
})();
exports.ScopedDefinition = ScopedDefinition;

//# sourceMappingURL=scoped-definition.js.map
