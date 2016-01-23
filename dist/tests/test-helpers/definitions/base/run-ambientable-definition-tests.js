var assert = require("assert");
function runAmbientableDefinitionTests(definition, structure) {
    it("should " + (structure.isAmbient ? "be" : "not be") + " ambient", function () {
        assert.equal(definition.isAmbient, structure.isAmbient || false);
    });
}
exports.runAmbientableDefinitionTests = runAmbientableDefinitionTests;

//# sourceMappingURL=run-ambientable-definition-tests.js.map
