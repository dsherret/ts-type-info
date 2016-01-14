var assert = require("assert");
var scope_1 = require("./../../../scope");
function runScopedDefinitionTests(definition, structure) {
    structure.scope = typeof structure.scope === "number" ? structure.scope : scope_1.Scope.public;
    it("should have a scope " + scope_1.Scope[structure.scope], function () {
        assert.equal(definition.scope, structure.scope);
    });
}
exports.runScopedDefinitionTests = runScopedDefinitionTests;

//# sourceMappingURL=run-scoped-definition-tests.js.map
