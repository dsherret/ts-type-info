var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class method decorator parameter tests", function () {
    var code = "\nfunction MyClassMethodParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {\n}\n\nclass MyClass {\n    myMethod1(@MyClassMethodParameterDecorator param1: string, param2: string) {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    describe("param1", function () {
        var p = def.classes[0].methods[0].parameters[0];
        it("will have one decorator", function () {
            assert.equal(p.decorators.length, 1);
        });
        describe("MyClassMethodParameterDecorator", function () {
            test_helpers_1.runDecoratorDefinitionTests(p.decorators[0], {
                name: "MyClassMethodParameterDecorator",
                arguments: []
            });
        });
    });
    describe("param2", function () {
        var p = def.classes[0].methods[0].parameters[1];
        it("will have zero decorators", function () {
            assert.equal(p.decorators.length, 0);
        });
    });
});

//# sourceMappingURL=class-method-parameter-decorator-tests.js.map
