var assert = require("assert");
function runExportableDefinitionTests(definition, isExported) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    it("should " + (isExported ? "be exported." : "not be exported."), function () {
        assert.equal(definition.isExported, isExported || false);
    });
}
exports.runExportableDefinitionTests = runExportableDefinitionTests;

//# sourceMappingURL=run-exportable-definition-tests.js.map
