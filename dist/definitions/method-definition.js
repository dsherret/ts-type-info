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
var named_definition_1 = require("./base/named-definition");
var decorated_definition_1 = require("./base/decorated-definition");
var scoped_definition_1 = require("./base/scoped-definition");
var MethodDefinition = (function () {
    function MethodDefinition(typeChecker, symbol) {
        this._parameters = [];
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
        this.fillReturnType(typeChecker, symbol);
        this.fillParameters(typeChecker, symbol);
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
    MethodDefinition.prototype.fillReturnType = function (typeChecker, symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    };
    MethodDefinition.prototype.fillParameters = function (typeChecker, symbol) {
        for (var _i = 0, _a = symbol.valueDeclaration.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new definitions_1.ParameterDefinition(typeChecker, parameterSymbol));
        }
    };
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
})();
exports.MethodDefinition = MethodDefinition;
utils_1.applyMixins(MethodDefinition, [named_definition_1.NamedDefinition, scoped_definition_1.ScopeDefinition, decorated_definition_1.DecoratableDefinition]);
