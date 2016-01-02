var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var assert = require("assert");
describe("class type parameters", function () {
    var code = "\nclass MyClass<T, U extends string> {\n    tProp: T;\n    uProp: U;\n}\n\nclass MyExtendsClass extends MyClass<number, string> {\n}\n\nclass MyImplementsClass implements MyClass<number, string> {\n    tProp: number;\n    uProp: string;\n}\n";
    var def = main_1.getStringInfo(code);
    describe("MyClass", function () {
        it("should have a type parameter name of T", function () {
            assert.equal(def.classes[0].typeParameters[0].name, "T");
        });
        it("should have a second type parameter name of U", function () {
            assert.equal(def.classes[0].typeParameters[1].name, "U");
        });
        it("should extend a type string", function () {
            assert.equal(def.classes[0].typeParameters[1].constraint.text, "string");
        });
    });
    describe("MyExtendsClass", function () {
        var c = def.classes[1];
        it("should extend a type name of MyClass<number, string>", function () {
            assert.equal(c.extends[0].text, "MyClass<number, string>");
        });
        it("should extend a definition MyClass with a number type param", function () {
            test_helpers_1.runTypeExpressionTests(c.extends[0].types[0].typeArguments[0], "number");
        });
        it("should extend a definition MyClass with a string type param", function () {
            test_helpers_1.runTypeExpressionTests(c.extends[0].types[0].typeArguments[1], "string");
        });
    });
    describe("MyImplementsClass", function () {
        var c = def.classes[2];
        it("should implement a type name of MyClass<number, string>", function () {
            assert.equal(c.implements[0].text, "MyClass<number, string>");
        });
        it("should implement a definition MyClass with a number type param", function () {
            test_helpers_1.runTypeExpressionTests(c.implements[0].types[0].typeArguments[0], "number");
        });
        it("should extend a definition MyClass with a string type param", function () {
            test_helpers_1.runTypeExpressionTests(c.implements[0].types[0].typeArguments[1], "string");
        });
    });
});

//# sourceMappingURL=type-parameter-tests.js.map
