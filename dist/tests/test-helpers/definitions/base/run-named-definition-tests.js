var assert = require("assert");
function runNamedDefinitionTests(definition, structure) {
    it("should have a name " + structure.name, function () {
        assert.equal(definition.name, structure.name);
    });
}
exports.runNamedDefinitionTests = runNamedDefinitionTests;

//# sourceMappingURL=run-named-definition-tests.js.map
