var path = require("path");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
// See Issue #23
describe("multiple file definition tests", function () {
    var fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/reference/main.ts");
    var fileDefs = main_1.getFileInfo([fileName]);
    var mainFileDef = fileDefs.filter(function (def) { return /main/.test(def.fileName); })[0];
    var referenceFileDef = fileDefs.filter(function (def) { return /reference-structures/.test(def.fileName); })[0];
    test_helpers_1.runFileDefinitionTests(mainFileDef, {
        variables: [{
                declarationType: "var",
                name: "c",
                typeExpression: { text: "MyReferenceClass" }
            }, {
                declarationType: "var",
                name: "i",
                typeExpression: { text: "MyReferenceInterface" }
            }, {
                declarationType: "var",
                name: "f",
                typeExpression: { text: "typeof MyReferenceFunction" },
                defaultExpression: { text: "MyReferenceFunction" }
            }, {
                declarationType: "var",
                name: "e",
                typeExpression: { text: "MyReferenceEnum" }
            }]
    });
    test_helpers_1.runFileDefinitionTests(referenceFileDef, {
        classes: [{
                name: "MyReferenceClass"
            }],
        interfaces: [{
                name: "MyReferenceInterface"
            }],
        enums: [{
                name: "MyReferenceEnum"
            }],
        functions: [{
                name: "MyReferenceFunction"
            }]
    });
});

//# sourceMappingURL=multiple-file-definition-tests.js.map
