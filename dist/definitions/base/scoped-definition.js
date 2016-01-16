var ts = require("typescript");
var scope_1 = require("./../../scope");
var ScopedDefinition = (function () {
    /* istanbul ignore next */ function ScopedDefinition() {
    }
    ScopedDefinition.prototype.fillScope = function (symbol) {
        if ((symbol.valueDeclaration.flags & 32 /* Private */) !== 0) {
            this.scope = scope_1.Scope.private;
        }
        else if ((symbol.valueDeclaration.flags & 64 /* Protected */) !== 0) {
            this.scope = scope_1.Scope.protected;
        }
        else {
            this.scope = scope_1.Scope.public;
        }
    };
    return ScopedDefinition;
})();
exports.ScopedDefinition = ScopedDefinition;

//# sourceMappingURL=scoped-definition.js.map
