var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var utils_1 = require("./../../utils");
var NamedDefinition = (function () {
    function NamedDefinition() {
    }
    Object.defineProperty(NamedDefinition.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    NamedDefinition.prototype.fillName = function (symbol) {
        this._name = symbol.getName();
    };
    Object.defineProperty(NamedDefinition.prototype, "name",
        __decorate([
            utils_1.Serializable
        ], NamedDefinition.prototype, "name", Object.getOwnPropertyDescriptor(NamedDefinition.prototype, "name")));
    return NamedDefinition;
})();
exports.NamedDefinition = NamedDefinition;
