var path = require("path");
var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("file import tests", function () {
    var fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/import.ts");
    var fileDef = main_1.getFileInfo([fileName]).filter(function (def) { return /import/.test(def.fileName); })[0];
    var NUM_IMPORTS = 5;
    it("should have " + NUM_IMPORTS + " imports", function () {
        assert.equal(fileDef.imports.length, NUM_IMPORTS);
    });
    test_helpers_1.runImportDefinitionTests(fileDef.imports[0], {
        definitionName: "TestClass",
        definitionType: definitions_1.ClassDefinition,
        fileName: "test-class.ts"
    });
    test_helpers_1.runImportDefinitionTests(fileDef.imports[1], {
        definitionName: "TestEnum",
        definitionType: definitions_1.EnumDefinition,
        fileName: "test-enum.ts"
    });
    test_helpers_1.runImportDefinitionTests(fileDef.imports[2], {
        definitionName: "Class1",
        definitionType: definitions_1.ClassDefinition,
        fileName: "test-multiple-classes.ts"
    });
    test_helpers_1.runImportDefinitionTests(fileDef.imports[3], {
        definitionName: "Class2",
        definitionType: definitions_1.ClassDefinition,
        fileName: "test-multiple-classes.ts"
    });
    test_helpers_1.runImportDefinitionTests(fileDef.imports[4], {
        definitionName: "default",
        definitionType: definitions_1.ClassDefinition,
        fileName: "test-default-class.ts"
    });
});

//# sourceMappingURL=import-tests.js.map
