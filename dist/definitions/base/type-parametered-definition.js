var type_parameter_definition_1 = require("./type-parameter-definition");
var TypeParameteredDefinition = (function () {
    function TypeParameteredDefinition() {
        this._typeParameters = [];
    }
    TypeParameteredDefinition.prototype.fillTypeParametersBySymbol = function (typeChecker, symbol) {
        this._typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(function (s) { return new type_parameter_definition_1.TypeParameterDefinition(typeChecker, s); });
    };
    TypeParameteredDefinition.prototype.fillTypeParametersBySignature = function (typeChecker, signature) {
        this._typeParameters = [];
        if (signature.typeParameters != null) {
            for (var _i = 0, _a = signature.typeParameters; _i < _a.length; _i++) {
                var typeParameter = _a[_i];
                this._typeParameters.push(new type_parameter_definition_1.TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    };
    Object.defineProperty(TypeParameteredDefinition.prototype, "typeParameters", {
        get: function () {
            return this._typeParameters;
        },
        enumerable: true,
        configurable: true
    });
    return TypeParameteredDefinition;
})();
exports.TypeParameteredDefinition = TypeParameteredDefinition;

//# sourceMappingURL=type-parametered-definition.js.map
