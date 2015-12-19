var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("base interface tests", function () {
    var code = "\nclass MyBaseClass {\n    name: string;\n}\n\ninterface MyChildInterface extends MyBaseClass {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    test_helpers_1.runNamedDefinitionTests(def.interfaces[0], "MyChildInterface");
    test_helpers_1.runNamedDefinitionTests(def.interfaces[0].extends[0], "MyBaseClass");
});

//# sourceMappingURL=extends-class-tests.js.map
