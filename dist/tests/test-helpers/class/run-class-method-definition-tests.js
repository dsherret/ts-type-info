var run_base_function_definition_tests_1 = require("./../function/base/run-base-function-definition-tests");
var run_scoped_definition_tests_1 = require("./../base/run-scoped-definition-tests");
function runClassMethodDefinitionTests(definition, method) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("method " + method.name, function () {
        run_base_function_definition_tests_1.runBaseFunctionDefinitionTests(definition, method);
        run_scoped_definition_tests_1.runScopedDefinitionTests(definition, method.scope);
    });
}
exports.runClassMethodDefinitionTests = runClassMethodDefinitionTests;

//# sourceMappingURL=run-class-method-definition-tests.js.map
