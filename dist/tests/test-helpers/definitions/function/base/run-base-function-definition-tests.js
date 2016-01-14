var base_1 = require("./../../base");
var run_return_typed_definition_tests_1 = require("./run-return-typed-definition-tests");
var run_parametered_definition_tests_1 = require("./run-parametered-definition-tests");
function runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure) {
    base_1.runNamedDefinitionTests(definition, structure);
    run_return_typed_definition_tests_1.runReturnTypedDefinitionTests(definition, structure);
    run_parametered_definition_tests_1.runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
}
exports.runBaseFunctionDefinitionTests = runBaseFunctionDefinitionTests;

//# sourceMappingURL=run-base-function-definition-tests.js.map
