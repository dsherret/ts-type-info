var assert = require("assert");
var run_parameter_definition_tests_1 = require("./run-parameter-definition-tests");
function runParameteredDefinitionTests(definition, params) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    it("should have " + params.length + " parameters", function () {
        assert.equal(definition.parameters.length, params.length);
    });
    definition.parameters.forEach(function (param, i) {
        run_parameter_definition_tests_1.runParameterDefinitionTests(param, params[i]);
    });
}
exports.runParameteredDefinitionTests = runParameteredDefinitionTests;

//# sourceMappingURL=run-parametered-definition-tests.js.map
