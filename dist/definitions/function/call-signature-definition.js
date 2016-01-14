var parameter_definition_1 = require("./parameter-definition");
var base_1 = require("./base");
var base_2 = require("./../base");
var utils_1 = require("./../../utils");
var CallSignatureDefinition = (function () {
    function CallSignatureDefinition(typeChecker, signature) {
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
        this.fillParametersBySignature(parameter_definition_1.ParameterDefinition, typeChecker, signature);
        this.fillTypeParametersBySignature(typeChecker, signature);
        this.minArgumentCount = typeChecker.getMinArgumentCount(signature);
    }
    return CallSignatureDefinition;
})();
exports.CallSignatureDefinition = CallSignatureDefinition;
utils_1.applyMixins(CallSignatureDefinition, [base_2.TypeParameteredDefinition, base_1.ParameteredDefinition, base_1.ReturnTypedDefinition]);

//# sourceMappingURL=call-signature-definition.js.map
