var assert = require("assert");
var path = require("path");
function runImportDefinitionTests(definition, importStructure) {
    describe("import " + importStructure.definitionName, function () {
        it("should have the name " + importStructure.definitionName, function () {
            assert.equal(definition.definition.name, importStructure.definitionName);
        });
        it("should have a matching type", function () {
            assert.equal(definition.definition instanceof importStructure.definitionType, true);
        });
        it("should have a file name that ends with " + importStructure.fileName, function () {
            assert.equal(path.basename(definition.file.fileName), importStructure.fileName);
        });
    });
}
exports.runImportDefinitionTests = runImportDefinitionTests;

//# sourceMappingURL=run-import-definition-tests.js.map
