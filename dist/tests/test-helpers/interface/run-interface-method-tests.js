var function_1 = require("./../function");
function runInterfaceMethodDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Interface definition should not be null.";
    }
    describe("method " + func.name, function () {
        function_1.runBaseFunctionDefinitionTests(definition, func);
    });
}
exports.runInterfaceMethodDefinitionTests = runInterfaceMethodDefinitionTests;

//# sourceMappingURL=run-interface-method-tests.js.map
