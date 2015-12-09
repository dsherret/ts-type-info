var assert = require("assert");
var run_parametered_definition_tests_1 = require("./../function/run-parametered-definition-tests");
function runConstructorDefinitionTests(definition, constructor) {
    if (constructor == null) {
        it("should not have a constructor", function () {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", function () {
            assert.notEqual(definition, null);
        });
        run_parametered_definition_tests_1.runParameteredDefinitionTests(definition, constructor.parameters);
    }
}
exports.runConstructorDefinitionTests = runConstructorDefinitionTests;

//# sourceMappingURL=run-constructor-definition-tests.js.map
