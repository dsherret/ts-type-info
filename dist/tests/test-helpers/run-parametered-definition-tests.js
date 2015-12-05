var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_typed_definition_tests_1 = require("./run-typed-definition-tests");
function runParameteredDefinitionTests(definition, params) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    it("should have " + params.length + " parameters", function () {
        assert.equal(definition.parameters.length, params.length);
    });
    definition.parameters.forEach(function (param, i) {
        describe("parameter " + params[i].name, function () {
            run_named_definition_tests_1.runNamedDefinitionTests(param, params[i].name);
            run_typed_definition_tests_1.runTypedDefinitionTests(param, params[i].type);
        });
    });
}
exports.runParameteredDefinitionTests = runParameteredDefinitionTests;

//# sourceMappingURL=run-parametered-definition-tests.js.map
