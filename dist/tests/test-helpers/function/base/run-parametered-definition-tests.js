var assert = require("assert");
var run_base_parameter_definition_tests_1 = require("./run-base-parameter-definition-tests");
function runParameteredDefinitionTests(definition, params) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    it("should have " + params.length + " parameters", function () {
        assert.equal(definition.parameters.length, params.length);
    });
    definition.parameters.forEach(function (param, i) {
        run_base_parameter_definition_tests_1.runBaseParameterDefinitionTests(param, params[i]);
    });
}
exports.runParameteredDefinitionTests = runParameteredDefinitionTests;

//# sourceMappingURL=run-parametered-definition-tests.js.map
