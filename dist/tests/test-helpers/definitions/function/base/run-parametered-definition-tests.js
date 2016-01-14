var assert = require("assert");
function runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure) {
    describe("parameters", function () {
        structure.parameters = structure.parameters || [];
        it("should have " + structure.parameters.length + " parameter(s)", function () {
            assert.equal(definition.parameters.length, structure.parameters.length);
        });
        structure.parameters.forEach(function (param, i) {
            runParameterDefinitionTests(definition.parameters[i], param);
        });
    });
}
exports.runParameteredDefinitionTests = runParameteredDefinitionTests;

//# sourceMappingURL=run-parametered-definition-tests.js.map
