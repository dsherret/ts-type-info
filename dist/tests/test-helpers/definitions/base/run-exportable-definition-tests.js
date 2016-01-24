var assert = require("assert");
function runExportableDefinitionTests(definition, structure) {
    it("should " + (structure.isExported ? "be" : "not be") + " exported.", function () {
        assert.equal(definition.isExported, structure.isExported || false);
    });
    it("should " + (structure.hasExportKeyword ? "not have" : "have") + " the export keyword", function () {
        assert.equal(definition.hasExportKeyword, structure.hasExportKeyword || false);
    });
}
exports.runExportableDefinitionTests = runExportableDefinitionTests;

//# sourceMappingURL=run-exportable-definition-tests.js.map
