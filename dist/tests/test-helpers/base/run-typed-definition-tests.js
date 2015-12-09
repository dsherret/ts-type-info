var run_type_tests_1 = require("./run-type-tests");
function runTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    run_type_tests_1.runTypeTests(definition.type, name);
}
exports.runTypedDefinitionTests = runTypedDefinitionTests;

//# sourceMappingURL=run-typed-definition-tests.js.map
