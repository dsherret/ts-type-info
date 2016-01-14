var ParameteredDefinition = (function () {
    function ParameteredDefinition() {
        this.parameters = [];
    }
    ParameteredDefinition.prototype.fillParametersBySymbol = function (paramDefinition, typeChecker, symbol) {
        this.parameters = typeChecker.getSymbolParametersFromSymbol(symbol).map(function (parameterSymbol) { return new paramDefinition(typeChecker, parameterSymbol); });
    };
    ParameteredDefinition.prototype.fillParametersBySignature = function (paramDefinition, typeChecker, signature) {
        this.parameters = [];
        for (var _i = 0, _a = signature.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            this.parameters.push(new paramDefinition(typeChecker, param));
        }
    };
    return ParameteredDefinition;
})();
exports.ParameteredDefinition = ParameteredDefinition;

//# sourceMappingURL=parametered-definition.js.map
