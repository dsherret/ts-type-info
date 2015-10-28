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
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var MethodDefinition = (function (_super) {
    __extends(MethodDefinition, _super);
    function MethodDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this._parameters = [];
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
        for (var _i = 0, _a = symbol.valueDeclaration.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new definitions_1.ParameterDefinition(typeChecker, parameterSymbol));
        }
    }
    Object.defineProperty(MethodDefinition.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MethodDefinition.prototype, "returnType", {
        get: function () {
            return this._returnType;
        },
        enumerable: true,
        configurable: true
    });
    MethodDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    Object.defineProperty(MethodDefinition.prototype, "parameters",
        __decorate([
            utils_1.Serializable
        ], MethodDefinition.prototype, "parameters", Object.getOwnPropertyDescriptor(MethodDefinition.prototype, "parameters")));
    Object.defineProperty(MethodDefinition.prototype, "returnType",
        __decorate([
            utils_1.Serializable
        ], MethodDefinition.prototype, "returnType", Object.getOwnPropertyDescriptor(MethodDefinition.prototype, "returnType")));
    return MethodDefinition;
})(definitions_1.NamedDefinition);
exports.MethodDefinition = MethodDefinition;
