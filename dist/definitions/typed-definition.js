var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var TypedDefinition = (function (_super) {
    __extends(TypedDefinition, _super);
    function TypedDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this._type = typeChecker.getTypeOfSymbol(symbol);
    }
    Object.defineProperty(TypedDefinition.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypedDefinition.prototype, "type",
        __decorate([
            utils_1.Serializable
        ], TypedDefinition.prototype, "type", Object.getOwnPropertyDescriptor(TypedDefinition.prototype, "type")));
    return TypedDefinition;
})(definitions_1.NamedDefinition);
exports.TypedDefinition = TypedDefinition;
