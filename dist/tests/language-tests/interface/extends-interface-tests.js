var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("base interface tests", function () {
    var code = "\ninterface MyBaseInterface {\n    name: string;\n}\n\ninterface MyChildInterface extends MyBaseInterface {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    describe("MyBaseInterface", function () {
        test_helpers_1.runNamedDefinitionTests(def.interfaces[0], "MyBaseInterface");
    });
    describe("MyChildInterface", function () {
        test_helpers_1.runNamedDefinitionTests(def.interfaces[1], "MyChildInterface");
        describe("extends clause", function () {
            test_helpers_1.runTypeExpressionTests(def.interfaces[1].extends[0], "MyBaseInterface");
        });
    });
});

//# sourceMappingURL=extends-interface-tests.js.map
