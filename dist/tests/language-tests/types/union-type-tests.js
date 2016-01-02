var main_1 = require("./../../../main");
var assert = require("assert");
var test_helpers_1 = require("./../../test-helpers");
describe("union type tests", function () {
    var code = "\nclass MyClass {\n    prop: MyClass | MyOtherClass<string>;\n}\n\nclass MyOtherClass<T> {\n}\n";
    var def = main_1.getStringInfo(code);
    var prop = def.classes[0].properties[0];
    describe("union type", function () {
        test_helpers_1.runTypeExpressionTests(prop.typeExpression, "MyClass | MyOtherClass<string>");
        describe("MyClass", function () {
            it("should have a type for MyClass", function () {
                assert.equal(prop.typeExpression.types[0].text, "MyClass");
            });
            it("should have a definition for MyClass in that type", function () {
                assert.equal(prop.typeExpression.types[0].definition, def.classes[0]);
            });
        });
        describe("MyOtherClass<string>", function () {
            it("should have a type for MyOtherClass<string>", function () {
                assert.equal(prop.typeExpression.types[1].text, "MyOtherClass<string>");
            });
            it("should have a parameter string", function () {
                assert.equal(prop.typeExpression.types[1].typeArguments[0].text, "string");
            });
            it("should have a definition for MyOtherClass in that type", function () {
                assert.equal(prop.typeExpression.types[1].definition, def.classes[1]);
            });
        });
    });
});

//# sourceMappingURL=union-type-tests.js.map
