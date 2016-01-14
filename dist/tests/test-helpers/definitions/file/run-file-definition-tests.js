var assert = require("assert");
var run_import_definition_tests_1 = require("./run-import-definition-tests");
var run_re_export_definition_tests_1 = require("./run-re-export-definition-tests");
var base_1 = require("./../base");
function runFileDefinitionTests(definition, structure) {
    structure.imports = structure.imports || [];
    structure.reExports = structure.reExports || [];
    base_1.runModuledDefinitionTests(definition, structure);
    describe("imports", function () {
        it("should have the expected number of imports", function () {
            assert.equal(definition.imports.length, structure.imports.length);
        });
        structure.imports.forEach(function (importStructure, i) {
            run_import_definition_tests_1.runImportDefinitionTests(definition.imports[i], importStructure);
        });
    });
    describe("reExports", function () {
        it("should have the expected number of reExports", function () {
            assert.equal(definition.reExports.length, structure.reExports.length);
        });
        structure.reExports.forEach(function (reExportStructure, i) {
            run_re_export_definition_tests_1.runReExportDefinitionTests(definition.reExports[i], reExportStructure);
        });
    });
}
exports.runFileDefinitionTests = runFileDefinitionTests;

//# sourceMappingURL=run-file-definition-tests.js.map
