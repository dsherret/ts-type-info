var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class decorator tests", function () {
    var code = "\nfunction MyClassDecorator(target: Function) {\n    console.log(target);\n}\n\n@MyClassDecorator\nclass MyClass1 {\n}\n\nclass MyClass2 {\n}\n";
    var def = main_1.getStringInfo(code);
    describe("MyClass1", function () {
        var c = def.classes[0];
        it("will have one decorator", function () {
            assert.equal(c.decorators.length, 1);
        });
        describe("MyClassDecorator", function () {
            test_helpers_1.runDecoratorDefinitionTests(c.decorators[0], {
                name: "MyClassDecorator",
                arguments: []
            });
        });
    });
    describe("MyClass2", function () {
        var c = def.classes[1];
        it("will have zero decorators", function () {
            assert.equal(c.decorators.length, 0);
        });
    });
});

//# sourceMappingURL=class-decorator-tests.js.map
