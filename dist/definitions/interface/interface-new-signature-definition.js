var utils_1 = require("./../../utils");
var function_1 = require("./../function");
var InterfaceNewSignatureDefinition = (function () {
    function InterfaceNewSignatureDefinition(typeChecker, signature) {
        this.fillParametersBySignature(function_1.ParameterDefinition, typeChecker, signature);
        this.fillReturnTypeExpressionBySignature(typeChecker, signature);
    }
    return InterfaceNewSignatureDefinition;
})();
exports.InterfaceNewSignatureDefinition = InterfaceNewSignatureDefinition;
utils_1.applyMixins(InterfaceNewSignatureDefinition, [function_1.ParameteredDefinition, function_1.ReturnTypedDefinition]);

//# sourceMappingURL=interface-new-signature-definition.js.map
