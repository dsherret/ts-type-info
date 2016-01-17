var general_1 = require("./../general");
var TypeParameteredDefinition = (function () {
    /* istanbul ignore next */ function TypeParameteredDefinition() {
    }
    TypeParameteredDefinition.prototype.fillTypeParametersBySymbol = function (typeChecker, symbol) {
        this.typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(function (s) { return new general_1.TypeParameterDefinition(typeChecker, s); });
    };
    TypeParameteredDefinition.prototype.fillTypeParametersBySignature = function (typeChecker, signature) {
        this.typeParameters = [];
        if (signature.typeParameters != null) {
            for (var _i = 0, _a = signature.typeParameters; _i < _a.length; _i++) {
                var typeParameter = _a[_i];
                this.typeParameters.push(new general_1.TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    };
    return TypeParameteredDefinition;
})();
exports.TypeParameteredDefinition = TypeParameteredDefinition;

//# sourceMappingURL=type-parametered-definition.js.map
