var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class property decorator tests", function () {
    var code = "\nfunction MyClassPropertyDecorator(target: Object, propertyKey: string) {\n}\n\nfunction MyClassPropertyAccessorDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassPropertyDecorator\n    myProperty1: string;\n    myProperty2: string;\n\n    @MyClassPropertyAccessorDecorator\n    get myProperty3() {\n        return \"\";\n    }\n\n    set myProperty3(val: string) {\n    }\n\n    get myProperty4() {\n        return \"\";\n    }\n\n    @MyClassPropertyAccessorDecorator\n    set myProperty4(val: string) {\n    }\n\n    get myProperty5() {\n        return \"\";\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    function runHasDecoratorTests(property, decoratorName) {
        it("will have one decorator", function () {
            assert.equal(property.decorators.length, 1);
        });
        if (property.decorators.length === 1) {
            describe(decoratorName, function () {
                test_helpers_1.runDecoratorDefinitionTests(property.decorators[0], {
                    name: decoratorName,
                    arguments: []
                });
            });
        }
    }
    function runNotHasDecoratorTests(property) {
        it("will have zero decorators", function () {
            assert.equal(property.decorators.length, 0);
        });
    }
    it("will have 5 properties", function () {
        assert.equal(def.classes[0].properties.length, 5);
    });
    describe("myProperty1", function () {
        var p = def.classes[0].properties[0];
        runHasDecoratorTests(p, "MyClassPropertyDecorator");
    });
    describe("myProperty2", function () {
        var p = def.classes[0].properties[1];
        runNotHasDecoratorTests(p);
    });
    describe("myProperty3", function () {
        var p = def.classes[0].properties[2];
        runHasDecoratorTests(p, "MyClassPropertyAccessorDecorator");
    });
    describe("myProperty4", function () {
        var p = def.classes[0].properties[3];
        runHasDecoratorTests(p, "MyClassPropertyAccessorDecorator");
    });
    describe("myProperty5", function () {
        var p = def.classes[0].properties[4];
        runNotHasDecoratorTests(p);
    });
});

//# sourceMappingURL=class-property-decorator-tests.js.map
