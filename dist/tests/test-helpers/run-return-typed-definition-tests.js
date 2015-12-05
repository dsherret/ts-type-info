var run_type_tests_1 = require("./run-type-tests");
function runReturnTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    run_type_tests_1.runTypeTests(definition.returnType, name);
}
exports.runReturnTypedDefinitionTests = runReturnTypedDefinitionTests;

//# sourceMappingURL=run-return-typed-definition-tests.js.map
