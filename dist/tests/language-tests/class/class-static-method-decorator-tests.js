var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class static method decorator tests", function () {
    var code = "\nfunction MyClassStaticMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassStaticMethodDecorator\n    static myStaticMethod1() {\n    }\n\n    static myStaticMethod2() {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    describe("myStaticMethod1", function () {
        var m = def.classes[0].staticMethods[0];
        it("will have one decorator", function () {
            assert.equal(m.decorators.length, 1);
        });
        describe("MyClassStaticMethodDecorator", function () {
            test_helpers_1.runDecoratorDefinitionTests(m.decorators[0], {
                name: "MyClassStaticMethodDecorator",
                arguments: []
            });
        });
    });
    describe("myStaticMethod2", function () {
        var m = def.classes[0].staticMethods[1];
        it("will have zero decorators", function () {
            assert.equal(m.decorators.length, 0);
        });
    });
});

//# sourceMappingURL=class-static-method-decorator-tests.js.map
