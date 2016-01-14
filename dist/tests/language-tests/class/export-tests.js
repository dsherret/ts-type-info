var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class exports tests", function () {
    var code = "\nexport class MyExportedClass {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyExportedClass",
                isExported: true
            }]
    });
});

//# sourceMappingURL=export-tests.js.map
