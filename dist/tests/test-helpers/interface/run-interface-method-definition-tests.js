var function_1 = require("./../function");
function runInterfaceMethodDefinitionTests(definition, structure) {
    describe("method " + structure.name, function () {
        function_1.runBaseFunctionDefinitionTests(function_1.runParameterDefinitionTests, definition, structure);
    });
}
exports.runInterfaceMethodDefinitionTests = runInterfaceMethodDefinitionTests;

//# sourceMappingURL=run-interface-method-definition-tests.js.map
