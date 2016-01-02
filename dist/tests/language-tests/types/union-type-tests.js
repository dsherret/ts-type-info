var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("union type tests", function () {
    var code = "\nclass MyClass {\n    prop: MyClass | MyOtherClass;\n}\n\nclass MyOtherClass {\n}\n";
    var def = main_1.getStringInfo(code);
    var prop = def.classes[0].properties[0];
    test_helpers_1.runTypeExpressionTests(prop.typeExpression, "MyClass | MyOtherClass");
    it("should have both classes in definitions", function () {
    });
});

//# sourceMappingURL=union-type-tests.js.map
