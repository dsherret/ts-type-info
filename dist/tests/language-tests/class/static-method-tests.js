var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class static method", function () {
    var code = "\nclass MyClassWithStaticMethods {\n    // parameters\n    static myParameterMethod(myParameter: string, myDefaultParameter = 15, myOptionalParameter?: string, ...myRestParameter: number[]) {\n        return \"\";\n    }\n\n    // return types\n    static myExplicitReturnTypeMethod(): string {\n        return null;\n    }\n\n    static myImplicitReturnTypeMethod() {\n        return \"\";\n    }\n\n    // scope\n    public static myPublicMethod() {\n    }\n\n    protected static myProtectedMethod() {\n    }\n\n    private static myPrivateMethod() {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[0], {
        name: "myParameterMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: [{
                name: "myParameter",
                type: "string"
            }, {
                name: "myDefaultParameter",
                type: "number",
                isOptional: true
            }, {
                name: "myOptionalParameter",
                type: "string",
                isOptional: true
            }, {
                name: "myRestParameter",
                type: "number[]",
                isOptional: true,
                isRestParameter: true
            }]
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[1], {
        name: "myExplicitReturnTypeMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: []
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[2], {
        name: "myImplicitReturnTypeMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: []
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[3], {
        name: "myPublicMethod",
        scope: scope_1.Scope.public,
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[4], {
        name: "myProtectedMethod",
        scope: scope_1.Scope.protected,
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[5], {
        name: "myPrivateMethod",
        scope: scope_1.Scope.private,
        returnType: "void",
        parameters: []
    });
});

//# sourceMappingURL=static-method-tests.js.map
