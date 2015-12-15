var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface name tests", function () {
    var code = "\ninterface MyInterface {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.interfaces[0], "MyInterface");
});

//# sourceMappingURL=name-tests.js.map
