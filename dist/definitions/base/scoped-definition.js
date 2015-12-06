var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    __decorate([
        utils_1.Serializable
    ], ScopedDefinition.prototype, "scope", null);
    return ScopedDefinition;
})();
exports.ScopedDefinition = ScopedDefinition;

//# sourceMappingURL=scoped-definition.js.map
