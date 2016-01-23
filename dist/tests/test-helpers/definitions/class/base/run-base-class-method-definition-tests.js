var run_base_function_definition_tests_1 = require("./../../function/base/run-base-function-definition-tests");
var run_class_method_parameter_definition_tests_1 = require("./../run-class-method-parameter-definition-tests");
var run_scoped_definition_tests_1 = require("./run-scoped-definition-tests");
function runBaseClassMethodDefinitionTests(definition, structure) {
    run_base_function_definition_tests_1.runBaseFunctionDefinitionTests(run_class_method_parameter_definition_tests_1.runClassMethodParameterDefinitionTests, definition, structure);
    run_scoped_definition_tests_1.runScopedDefinitionTests(definition, structure);
}
exports.runBaseClassMethodDefinitionTests = runBaseClassMethodDefinitionTests;

//# sourceMappingURL=run-base-class-method-definition-tests.js.map
