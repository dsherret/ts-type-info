var path = require("path");
var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("file re-export tests", function () {
    var fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/re-export.ts");
    var fileDef = main_1.getFileInfo([fileName]).filter(function (def) { return /re\-export/.test(def.fileName); })[0];
    var NUM_RE_EXPORTS = 2;
    it("should have " + NUM_RE_EXPORTS + " re-exports", function () {
        assert.equal(fileDef.reExports.length, NUM_RE_EXPORTS);
    });
    test_helpers_1.runReExportDefinitionTests(fileDef.reExports[0], {
        definitionName: "TestClass",
        definitionType: definitions_1.ClassDefinition,
        fileName: "test-class.ts"
    });
    test_helpers_1.runReExportDefinitionTests(fileDef.reExports[1], {
        definitionName: "TestEnum",
        definitionType: definitions_1.EnumDefinition,
        fileName: "test-enum.ts"
    });
});

//# sourceMappingURL=re-export-tests.js.map
