var ts = require("typescript");
var scope_1 = require("./../../scope");
var ScopeDefinition = (function () {
    function ScopeDefinition() {
    }
    Object.defineProperty(ScopeDefinition.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    ScopeDefinition.prototype.initializeScopeDefinition = function (symbol) {
        if ((symbol.valueDeclaration.flags & 32) != 0) {
            this._scope = scope_1.Scope.private;
        }
        else if ((symbol.valueDeclaration.flags & 64) != 0) {
            this._scope = scope_1.Scope.protected;
        }
        else {
            this._scope = scope_1.Scope.public;
        }
    };
    return ScopeDefinition;
})();
exports.ScopeDefinition = ScopeDefinition;
