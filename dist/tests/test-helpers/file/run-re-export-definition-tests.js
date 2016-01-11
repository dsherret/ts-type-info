var assert = require("assert");
var path = require("path");
var base_1 = require("./../base");
function runReExportDefinitionTests(definition, reExport) {
    if (definition == null) {
        throw "Re-export definition should not be null.";
    }
    describe("re-export " + reExport.definitionName, function () {
        base_1.runNamedDefinitionTests(definition.definition, reExport.definitionName);
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
