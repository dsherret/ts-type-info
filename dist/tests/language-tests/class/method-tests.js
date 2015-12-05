var assert = require("assert");
var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class method", function () {
    var code = "\nclass MyClass {\n    // parameters\n    myParameterMethod(myParameter: string) {\n        return \"\";\n    }\n\n    // return types\n    myExplicitReturnTypeMethod(): string {\n        return null;\n    }\n\n    myImplicitReturnTypeMethod() {\n        return \"\";\n    }\n\n    // scope\n    public myPublicMethod() {\n    }\n\n    protected myProtectedMethod() {\n    }\n\n    private myPrivateMethod() {\n    }\n}";
    var def = main_1.getStringInfo(code);
    describe("method myParameterMethod", function () {
        var method = def.classes[0].methods[0];
        test_helpers_1.runNamedDefinitionTests(method, "myParameterMethod");
        it("should have one parameter", function () {
            assert.equal(method.parameters.length, 1);
        });
        describe("parameter myParameter", function () {
            var param = method.parameters[0];
            it("should have name myParameter", function () {
                assert.equal(param.name, "myParameter");
            });
            it("should be type string", function () {
                assert.equal(param.type.name, "string");
            });
        });
    });
    describe("method myExplicitReturnTypeMethod", function () {
        var method = def.classes[0].methods[1];
        test_helpers_1.runNamedDefinitionTests(method, "myExplicitReturnTypeMethod");
        it("should have a return type of string", function () {
            assert.equal(method.returnType.name, "string");
        });
    });
    describe("method myImplicitReturnTypeMethod", function () {
        var method = def.classes[0].methods[2];
        test_helpers_1.runNamedDefinitionTests(method, "myImplicitReturnTypeMethod");
        it("should have a string return type when specified implicitly", function () {
            assert.equal(method.returnType.name, "string");
        });
    });
    describe("method myPublicMethod", function () {
        var method = def.classes[0].methods[3];
        test_helpers_1.runNamedDefinitionTests(method, "myPublicMethod");
        test_helpers_1.runScopedDefinitionTests(method, scope_1.Scope.public);
    });
    describe("method myProtectedMethod", function () {
        var method = def.classes[0].methods[4];
        test_helpers_1.runNamedDefinitionTests(method, "myProtectedMethod");
        test_helpers_1.runScopedDefinitionTests(method, scope_1.Scope.protected);
    });
    describe("method myPrivateMethod", function () {
        var method = def.classes[0].methods[5];
        test_helpers_1.runNamedDefinitionTests(method, "myPrivateMethod");
        test_helpers_1.runScopedDefinitionTests(method, scope_1.Scope.private);
    });
});

//# sourceMappingURL=method-tests.js.map
