var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class exports tests", function () {
    var code = "\nclass MyClass {\n}\nexport class MyExportedClass {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runExportableDefinitionTests(def.classes[0], false);
    test_helpers_1.runExportableDefinitionTests(def.classes[1], true);
});

//# sourceMappingURL=export-tests.js.map
