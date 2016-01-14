var assert = require("assert");
var function_1 = require("./../function");
var run_class_method_parameter_definition_tests_1 = require("./run-class-method-parameter-definition-tests");
function runConstructorDefinitionTests(definition, structure) {
    if (structure == null) {
        it("should not have a constructor", function () {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", function () {
            assert.notEqual(definition, null);
        });
        function_1.runParameteredDefinitionTests(run_class_method_parameter_definition_tests_1.runClassMethodParameterDefinitionTests, definition, structure);
    }
}
exports.runConstructorDefinitionTests = runConstructorDefinitionTests;

//# sourceMappingURL=run-constructor-definition-tests.js.map
