var assert = require("assert");
var path = require("path");
var base_1 = require("./../base");
function runImportDefinitionTests(definition, importStructure) {
    if (definition == null) {
        throw "Import definition should not be null.";
    }
    describe("import " + importStructure.definitionName, function () {
        base_1.runNamedDefinitionTests(definition.definition, importStructure.definitionName);
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
