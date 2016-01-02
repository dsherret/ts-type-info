var definitions_1 = require("./../../definitions");
var base_1 = require("./base");
var utils_1 = require("./../../utils");
var CallSignatureDefinition = (function () {
    function CallSignatureDefinition(typeChecker, signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(definitions_1.ParameterDefinition, typeChecker, signature);
        this.fillTypeParameters(typeChecker, signature);
        this._minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }
    Object.defineProperty(CallSignatureDefinition.prototype, "minArgumentCount", {
        get: function () {
            return this._minArgumentCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallSignatureDefinition.prototype, "typeParameters", {
        get: function () {
            return this._typeParameters;
        },
        enumerable: true,
        configurable: true
    });
    CallSignatureDefinition.prototype.fillTypeParameters = function (typeChecker, signature) {
        this._typeParameters = [];
        if (signature.typeParameters != null) {
            for (var _i = 0, _a = signature.typeParameters; _i < _a.length; _i++) {
                var typeParameter = _a[_i];
                this._typeParameters.push(new definitions_1.TypeParameterDefinition(typeChecker, typeParameter.getSymbol()));
            }
        }
    };
    return CallSignatureDefinition;
})();
exports.CallSignatureDefinition = CallSignatureDefinition;
utils_1.applyMixins(CallSignatureDefinition, [base_1.ReturnTypedDefinition, base_1.ParameteredDefinition]);

//# sourceMappingURL=call-signature-definition.js.map
