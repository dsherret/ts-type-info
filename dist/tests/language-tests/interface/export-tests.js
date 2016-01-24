var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface exports tests", function () {
    var code = "\nexport interface MyExportedInterface {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyExportedInterface",
                isExported: true,
                hasExportKeyword: true
            }]
    });
});

//# sourceMappingURL=export-tests.js.map
