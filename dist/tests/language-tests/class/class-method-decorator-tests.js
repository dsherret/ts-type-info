var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class method decorator tests", function () {
    var code = "\nfunction MyClassMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassMethodDecorator\n    myMethod1() {\n    }\n\n    myMethod2() {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    describe("myMethod1", function () {
        var m = def.classes[0].methods[0];
        it("will have one decorator", function () {
            assert.equal(m.decorators.length, 1);
        });
        describe("MyClassMethodDecorator", function () {
            test_helpers_1.runDecoratorDefinitionTests(m.decorators[0], {
                name: "MyClassMethodDecorator",
                arguments: []
            });
        });
    });
    describe("myMethod2", function () {
        var m = def.classes[0].methods[1];
        it("will have zero decorators", function () {
            assert.equal(m.decorators.length, 0);
        });
    });
});

//# sourceMappingURL=class-method-decorator-tests.js.map
