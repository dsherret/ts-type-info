var assert = require("assert");
function runAmbientableDefinitionTests(definition, structure) {
    it("should " + (structure.isAmbient ? "be" : "not be") + " ambient", function () {
        assert.equal(definition.isAmbient, structure.isAmbient || false);
    });
    it("should " + (structure.hasDeclareKeyword ? "have" : "not have") + " the declare keyword", function () {
        assert.equal(definition.hasDeclareKeyword, structure.hasDeclareKeyword || false);
    });
}
exports.runAmbientableDefinitionTests = runAmbientableDefinitionTests;

//# sourceMappingURL=run-ambientable-definition-tests.js.map
