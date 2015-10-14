var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var ts = require("typescript");
var decorators_1 = require("./../utils/decorators");
var Type = (function () {
    function Type(typeChecker, _tsType, node) {
        this._tsType = _tsType;
        this._name = typeChecker.typeToString(_tsType, node, 0);
    }
    Object.defineProperty(Type.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "tsType", {
        get: function () {
            return this._tsType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "name",
        __decorate([
            decorators_1.Serializable
        ], Type.prototype, "name", Object.getOwnPropertyDescriptor(Type.prototype, "name")));
    return Type;
})();
exports.Type = Type;

//# sourceMappingURL=type.js.map
