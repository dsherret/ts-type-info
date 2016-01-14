var ParameteredDefinition = (function () {
    function ParameteredDefinition() {
        this._parameters = [];
    }
    ParameteredDefinition.prototype.fillParametersBySymbol = function (paramDefinition, typeChecker, symbol) {
        this._parameters = typeChecker.getSymbolParametersFromSymbol(symbol).map(function (parameterSymbol) { return new paramDefinition(typeChecker, parameterSymbol); });
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
    return ParameteredDefinition;
})();
exports.ParameteredDefinition = ParameteredDefinition;

//# sourceMappingURL=parametered-definition.js.map
