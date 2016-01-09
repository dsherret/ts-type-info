var path = require("path");
var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
// See Issue #23
describe("multiple file definition tests", function () {
    var fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/reference/main.ts");
    var fileDefs = main_1.getFileInfo([fileName]);
    var mainFileDef = fileDefs.filter(function (def) { return /main/.test(def.fileName); })[0];
    var referenceFileDef = fileDefs.filter(function (def) { return /reference-structures/.test(def.fileName); })[0];
    it("should have no classes from the other file", function () {
        assert.equal(mainFileDef.classes.length, 0);
    });
    it("should have no interfaces from the other file", function () {
        assert.equal(mainFileDef.interfaces.length, 0);
    });
    it("should have no enums from the other file", function () {
        assert.equal(mainFileDef.enums.length, 0);
    });
    it("should have no functions from the other file", function () {
        assert.equal(mainFileDef.functions.length, 0);
    });
    test_helpers_1.runNamedDefinitionTests(referenceFileDef.classes[0], "MyReferenceClass");
    test_helpers_1.runNamedDefinitionTests(referenceFileDef.interfaces[0], "MyReferenceInterface");
    test_helpers_1.runNamedDefinitionTests(referenceFileDef.enums[0], "MyReferenceEnum");
    test_helpers_1.runNamedDefinitionTests(referenceFileDef.functions[0], "MyReferenceFunction");
});

//# sourceMappingURL=multiple-file-definition-tests.js.map
