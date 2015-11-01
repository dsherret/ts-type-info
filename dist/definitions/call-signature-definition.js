var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
    Object.defineProperty(CallSignatureDefinition.prototype, "minArgumentCount",
        __decorate([
            utils_1.Serializable
        ], CallSignatureDefinition.prototype, "minArgumentCount", Object.getOwnPropertyDescriptor(CallSignatureDefinition.prototype, "minArgumentCount")));
    Object.defineProperty(CallSignatureDefinition.prototype, "typeParameters",
        __decorate([
            utils_1.Serializable
        ], CallSignatureDefinition.prototype, "typeParameters", Object.getOwnPropertyDescriptor(CallSignatureDefinition.prototype, "typeParameters")));
    return CallSignatureDefinition;
})();
exports.CallSignatureDefinition = CallSignatureDefinition;
utils_1.applyMixins(CallSignatureDefinition, [return_typed_definition_1.ReturnTypedDefinition, parametered_definition_1.ParameteredDefinition]);
