var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class property decorator tests", function () {
    var code = "\nfunction MyClassStaticPropertyDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassStaticPropertyDecorator\n    static myStaticProperty1: string;\n    static myStaticProperty2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    describe("myStaticProperty1", function () {
        var p = def.classes[0].staticProperties[0];
        it("will have one decorator", function () {
            assert.equal(p.decorators.length, 1);
        });
        describe("MyClassStaticPropertyDecorator", function () {
            test_helpers_1.runDecoratorDefinitionTests(p.decorators[0], {
                name: "MyClassStaticPropertyDecorator",
                arguments: []
            });
        });
    });
    describe("myStaticProperty2", function () {
        var p = def.classes[0].staticProperties[1];
        it("will have zero decorators", function () {
            assert.equal(p.decorators.length, 0);
        });
    });
});

//# sourceMappingURL=class-static-property-decorator-tests.js.map
