var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class method", function () {
    var code = "\nclass MyClass {\n    // parameters\n    myParameterMethod(myParameter: string) {\n        return \"\";\n    }\n\n    // return types\n    myExplicitReturnTypeMethod(): string {\n        return null;\n    }\n\n    myImplicitReturnTypeMethod() {\n        return \"\";\n    }\n\n    // scope\n    public myPublicMethod() {\n    }\n\n    protected myProtectedMethod() {\n    }\n\n    private myPrivateMethod() {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[0], {
        name: "myParameterMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: [{
                name: "myParameter",
                type: "string"
            }]
    });
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[1], {
        name: "myExplicitReturnTypeMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: []
    });
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[2], {
        name: "myImplicitReturnTypeMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: []
    });
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[3], {
        name: "myPublicMethod",
        scope: scope_1.Scope.public,
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[4], {
        name: "myProtectedMethod",
        scope: scope_1.Scope.protected,
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[5], {
        name: "myPrivateMethod",
        scope: scope_1.Scope.private,
        returnType: "void",
        parameters: []
    });
});

//# sourceMappingURL=method-tests.js.map
