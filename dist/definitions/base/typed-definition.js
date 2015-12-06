var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var utils_1 = require("./../../utils");
var TypedDefinition = (function () {
    function TypedDefinition() {
    }
    TypedDefinition.prototype.fillType = function (typeChecker, symbol) {
        this._type = typeChecker.getTypeOfSymbol(symbol);
    };
    Object.defineProperty(TypedDefinition.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        utils_1.Serializable
    ], TypedDefinition.prototype, "type", null);
    return TypedDefinition;
})();
exports.TypedDefinition = TypedDefinition;

//# sourceMappingURL=typed-definition.js.map
