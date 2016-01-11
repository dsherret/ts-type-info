var assert = require("assert");
function runNamedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Named definition should not be null: " + name;
    }
    it("should have a name " + name, function () {
        assert.equal(definition.name, name);
    });
}
exports.runNamedDefinitionTests = runNamedDefinitionTests;

//# sourceMappingURL=run-named-definition-tests.js.map
