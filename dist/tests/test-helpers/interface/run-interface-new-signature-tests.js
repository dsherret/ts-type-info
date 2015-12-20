var function_1 = require("./../function");
function runInterfaceNewSignatureDefinitionTests(definition, newSignature) {
    function_1.runParameteredDefinitionTests(definition, newSignature.parameters);
    function_1.runReturnTypedDefinitionTests(definition, newSignature.returnType);
}
exports.runInterfaceNewSignatureDefinitionTests = runInterfaceNewSignatureDefinitionTests;

//# sourceMappingURL=run-interface-new-signature-tests.js.map
