var base_1 = require("./../base");
var ensure_not_null_1 = require("./../../ensure-not-null");
var base_2 = require("./base");
var run_parameter_definition_tests_1 = require("./run-parameter-definition-tests");
function runFunctionDefinitionTests(definition, structure) {
    describe("function " + structure.name, function () {
        ensure_not_null_1.ensureNotNull(definition, function () {
            base_2.runBaseFunctionDefinitionTests(run_parameter_definition_tests_1.runParameterDefinitionTests, definition, structure);
            base_1.runAmbientableDefinitionTests(definition, structure);
            base_1.runExportableDefinitionTests(definition, structure);
        });
    });
}
exports.runFunctionDefinitionTests = runFunctionDefinitionTests;

//# sourceMappingURL=run-function-definition-tests.js.map
