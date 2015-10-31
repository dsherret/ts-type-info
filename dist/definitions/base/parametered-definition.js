var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var utils_1 = require("./../../utils");
var definitions_1 = require("./../../definitions");
var ParameteredDefinition = (function () {
    function ParameteredDefinition() {
        this._parameters = [];
    }
    ParameteredDefinition.prototype.fillParameters = function (typeChecker, symbol) {
        this._parameters = [];
        for (var _i = 0, _a = this.getDeclaration(symbol).parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new definitions_1.ParameterDefinition(typeChecker, parameterSymbol));
        }
    };
    Object.defineProperty(ParameteredDefinition.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    ParameteredDefinition.prototype.getDeclaration = function (symbol) {
        if (symbol.valueDeclaration != null) {
            return symbol.valueDeclaration;
        }
        else if (symbol.getDeclarations().length == 1) {
            return symbol.getDeclarations()[0];
        }
        else {
            throw "Could not get declaration when getting parameters.";
        }
    };
    Object.defineProperty(ParameteredDefinition.prototype, "parameters",
        __decorate([
            utils_1.Serializable
        ], ParameteredDefinition.prototype, "parameters", Object.getOwnPropertyDescriptor(ParameteredDefinition.prototype, "parameters")));
    return ParameteredDefinition;
})();
exports.ParameteredDefinition = ParameteredDefinition;
