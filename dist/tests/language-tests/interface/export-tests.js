var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface exports tests", function () {
    var code = "\ninterface MyInterface {\n}\nexport interface MyExportedInterface {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runExportableDefinitionTests(def.interfaces[0], false);
    test_helpers_1.runExportableDefinitionTests(def.interfaces[1], true);
});

//# sourceMappingURL=export-tests.js.map
