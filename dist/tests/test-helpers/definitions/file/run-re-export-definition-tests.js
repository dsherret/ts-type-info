var assert = require("assert");
var path = require("path");
function runReExportDefinitionTests(definition, reExport) {
    describe("re-export " + reExport.definitionName, function () {
        it("should have the name " + reExport.definitionName, function () {
            assert.equal(definition.definition.name, reExport.definitionName);
        });
        it("should have a matching type", function () {
            assert.equal(definition.definition instanceof reExport.definitionType, true);
        });
        it("should have a file name that ends with " + reExport.fileName, function () {
            assert.equal(path.basename(definition.file.fileName), reExport.fileName);
        });
    });
}
exports.runReExportDefinitionTests = runReExportDefinitionTests;

//# sourceMappingURL=run-re-export-definition-tests.js.map
