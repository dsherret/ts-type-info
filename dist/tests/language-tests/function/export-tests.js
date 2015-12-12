var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function export tests", function () {
    var code = "\nfunction myFunction() {\n}\nexport function myExportedFunction() {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFunctionDefinitionTests(def.functions[0], {
        name: "myFunction",
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runFunctionDefinitionTests(def.functions[1], {
        name: "myExportedFunction",
        returnType: "void",
        parameters: [],
        isExported: true
    });
});

//# sourceMappingURL=export-tests.js.map
