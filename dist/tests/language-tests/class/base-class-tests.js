var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("base class tests", function () {
    var code = "\nclass MyBaseClass {\n    name1: string;\n}\n\nclass MyChildClass extends MyBaseClass {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    test_helpers_1.runNamedDefinitionTests(def.classes[1], "MyChildClass");
    test_helpers_1.runNamedDefinitionTests(def.classes[1].extends[0], "MyBaseClass");
});

//# sourceMappingURL=base-class-tests.js.map
