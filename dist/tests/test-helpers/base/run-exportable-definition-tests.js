var assert = require("assert");
function runExportableDefinitionTests(definition, structure) {
    it("should " + (structure.isExported ? "be exported." : "not be exported."), function () {
        assert.equal(definition.isExported, structure.isExported || false);
    });
}
exports.runExportableDefinitionTests = runExportableDefinitionTests;

//# sourceMappingURL=run-exportable-definition-tests.js.map
