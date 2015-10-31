var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var Type = (function () {
    function Type(typeChecker, _tsType) {
        this._tsType = _tsType;
        this._name = typeChecker.typeToString(_tsType);
        this.fillProperties(typeChecker);
    }
    Object.defineProperty(Type.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "properties", {
        get: function () {
            return this._properties;
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
    Type.prototype.fillProperties = function (typeChecker) {
        var properties = this._tsType.getProperties();
        this._properties = properties.map(function (property) { return new definitions_1.PropertyDefinition(typeChecker, property); });
    };
    Object.defineProperty(Type.prototype, "name",
        __decorate([
            utils_1.Serializable
        ], Type.prototype, "name", Object.getOwnPropertyDescriptor(Type.prototype, "name")));
    Object.defineProperty(Type.prototype, "properties",
        __decorate([
            utils_1.Serializable
        ], Type.prototype, "properties", Object.getOwnPropertyDescriptor(Type.prototype, "properties")));
    return Type;
})();
exports.Type = Type;
