var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class extends tests", function () {
    var code = "\nclass MyBaseClass {\n    name1: string;\n}\n\nclass MyChildClass extends MyBaseClass {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    describe("MyBaseClass", function () {
        test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    });
    describe("MyChildClass", function () {
        test_helpers_1.runNamedDefinitionTests(def.classes[1], "MyChildClass");
        describe("extends clause", function () {
            test_helpers_1.runTypeExpressionTests(def.classes[1].extends[0], "MyBaseClass");
        });
    });
});

//# sourceMappingURL=extends-class-tests.js.map
