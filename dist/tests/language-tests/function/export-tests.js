var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function export tests", function () {
    var code = "\nfunction myFunction() {\n}\nexport function myExportedFunction() {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "myFunction"
            }, {
                name: "myExportedFunction",
                isExported: true,
                hasExportKeyword: true
            }]
    });
});

//# sourceMappingURL=export-tests.js.map
