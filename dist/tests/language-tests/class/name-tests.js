var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class name tests", function () {
    var code = "\nclass MyClass {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyClass");
});

//# sourceMappingURL=name-tests.js.map
