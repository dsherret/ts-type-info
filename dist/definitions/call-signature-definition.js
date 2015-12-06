var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var definitions_1 = require("./../definitions");
var return_typed_definition_1 = require("./base/return-typed-definition");
var parametered_definition_1 = require("./base/parametered-definition");
var utils_1 = require("./../utils");
var CallSignatureDefinition = (function () {
    function CallSignatureDefinition(typeChecker, signature) {
        this.fillReturnTypeBySignature(typeChecker, signature);
        this.fillParametersBySignature(typeChecker, signature);
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
    __decorate([
        utils_1.Serializable
    ], CallSignatureDefinition.prototype, "minArgumentCount", null);
    __decorate([
        utils_1.Serializable
    ], CallSignatureDefinition.prototype, "typeParameters", null);
    return CallSignatureDefinition;
})();
exports.CallSignatureDefinition = CallSignatureDefinition;
utils_1.applyMixins(CallSignatureDefinition, [return_typed_definition_1.ReturnTypedDefinition, parametered_definition_1.ParameteredDefinition]);

//# sourceMappingURL=call-signature-definition.js.map
