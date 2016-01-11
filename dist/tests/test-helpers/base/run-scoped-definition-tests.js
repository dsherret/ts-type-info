var assert = require("assert");
var scope_1 = require("./../../../scope");
function runScopedDefinitionTests(definition, scope) {
    if (definition == null) {
        throw "Scoped definition should not be null.";
    }
    it("should have a scope " + scope_1.Scope[scope], function () {
        assert.equal(definition.scope, scope);
    });
}
exports.runScopedDefinitionTests = runScopedDefinitionTests;

//# sourceMappingURL=run-scoped-definition-tests.js.map
