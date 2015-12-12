var run_base_function_definition_tests_1 = require("./../../function/base/run-base-function-definition-tests");
var base_1 = require("./../../base");
function runBaseClassMethodDefinitionTests(definition, method) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    run_base_function_definition_tests_1.runBaseFunctionDefinitionTests(definition, method);
    base_1.runScopedDefinitionTests(definition, method.scope);
}
exports.runBaseClassMethodDefinitionTests = runBaseClassMethodDefinitionTests;

//# sourceMappingURL=run-base-class-method-definition-tests.js.map
