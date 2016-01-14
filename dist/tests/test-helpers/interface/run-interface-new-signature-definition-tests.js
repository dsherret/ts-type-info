var function_1 = require("./../function");
function runInterfaceNewSignatureDefinitionTests(definition, structure) {
    function_1.runParameteredDefinitionTests(function_1.runParameterDefinitionTests, definition, structure);
    function_1.runReturnTypedDefinitionTests(definition, structure);
}
exports.runInterfaceNewSignatureDefinitionTests = runInterfaceNewSignatureDefinitionTests;

//# sourceMappingURL=run-interface-new-signature-definition-tests.js.map
