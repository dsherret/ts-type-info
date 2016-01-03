var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class extends implements tests", function () {
    var code = "\ninterface MyInterface {\n    name: string;\n}\n\nclass MyBaseClass {\n    prop: string;\n}\n\nclass MyExtendsImplementsClass extends MyBaseClass implements MyInterface {\n    name: string;\n}\n";
    var def = main_1.getStringInfo(code);
    describe("MyExtendsImplementsClass", function () {
        describe("extends clause", function () {
            test_helpers_1.runTypeExpressionTests(def.classes[1].extends[0], "MyBaseClass");
        });
        describe("implements clause", function () {
            test_helpers_1.runTypeExpressionTests(def.classes[1].implements[0], "MyInterface");
        });
    });
});

//# sourceMappingURL=extends-implements-tests.js.map
