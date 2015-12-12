var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var utils_1 = require("./../../../utils");
var ParameteredDefinition = (function () {
    function ParameteredDefinition() {
        this._parameters = [];
    }
    ParameteredDefinition.prototype.fillParametersBySymbol = function (paramDefinition, typeChecker, symbol) {
        this._parameters = [];
        for (var _i = 0, _a = this.getDeclaration(symbol).parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new paramDefinition(typeChecker, parameterSymbol));
        }
    };
    ParameteredDefinition.prototype.fillParametersBySignature = function (paramDefinition, typeChecker, signature) {
        this._parameters = [];
        for (var _i = 0, _a = signature.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            this._parameters.push(new paramDefinition(typeChecker, param));
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
        else if (symbol.getDeclarations().length === 1) {
            return symbol.getDeclarations()[0];
        }
        else {
            throw "Could not get declaration when getting parameters.";
        }
    };
    __decorate([
        utils_1.Serializable
    ], ParameteredDefinition.prototype, "parameters", null);
    return ParameteredDefinition;
})();
exports.ParameteredDefinition = ParameteredDefinition;

//# sourceMappingURL=parametered-definition.js.map
