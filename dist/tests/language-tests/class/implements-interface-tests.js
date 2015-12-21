var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("base class tests", function () {
    var code = "\ninterface MyInterface {\n    name: string;\n}\n\ninterface MyTest {\n    name2: string;\n}\n\nclass MyClassImplementsInterface implements MyInterface, MyTest {\n    name: string;\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyClassImplementsInterface");
    test_helpers_1.runNamedDefinitionTests(def.classes[0].implements[0], "MyInterface");
});

//# sourceMappingURL=implements-interface-tests.js.map
