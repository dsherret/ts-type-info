var ts = require("typescript");
var utils_1 = require("./../../utils");
var function_1 = require("./../function");
var InterfaceNewSignatureDefinition = (function () {
    function InterfaceNewSignatureDefinition(typeChecker, signature) {
        this.fillParametersBySignature(function_1.ParameterDefinition, typeChecker, signature);
        this.fillReturnTypeBySignature(typeChecker, signature);
    }
    InterfaceNewSignatureDefinition.isNewSignature = function (symbol) {
        return (symbol.getFlags() & 131072) !== 0;
    };
    return InterfaceNewSignatureDefinition;
})();
exports.InterfaceNewSignatureDefinition = InterfaceNewSignatureDefinition;
utils_1.applyMixins(InterfaceNewSignatureDefinition, [function_1.ParameteredDefinition, function_1.ReturnTypedDefinition]);

//# sourceMappingURL=interface-new-signature-definition.js.map
