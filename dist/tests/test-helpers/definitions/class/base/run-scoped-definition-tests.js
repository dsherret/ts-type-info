var assert = require("assert");
var definitions_1 = require("./../../../../../definitions");
function runScopedDefinitionTests(definition, structure) {
    structure.scope = typeof structure.scope === "number" ? structure.scope : definitions_1.Scope.public;
    it("should have a scope " + definitions_1.Scope[structure.scope], function () {
        assert.equal(definition.scope, structure.scope);
    });
}
exports.runScopedDefinitionTests = runScopedDefinitionTests;

//# sourceMappingURL=run-scoped-definition-tests.js.map
