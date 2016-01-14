var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class method", function () {
    var code = "\nclass MyClass {\n    // parameters\n    myParameterMethod(myParameter: string, myDefaultParameter = 15, myOptionalParameter?: string, ...myRestParameter: number[]) {\n        return \"\";\n    }\n\n    // return types\n    myExplicitReturnTypeMethod(): string {\n        return null;\n    }\n\n    myImplicitReturnTypeMethod() {\n        return \"\";\n    }\n\n    // scope\n    public myPublicMethod() {\n    }\n\n    protected myProtectedMethod() {\n    }\n\n    private myPrivateMethod() {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                methods: [{
                        name: "myParameterMethod",
                        parameters: [{
                                name: "myParameter",
                                typeExpression: { text: "string" }
                            }, {
                                name: "myDefaultParameter",
                                typeExpression: { text: "number" },
                                isOptional: true,
                                defaultExpression: { text: "15" }
                            }, {
                                name: "myOptionalParameter",
                                typeExpression: { text: "string" },
                                isOptional: true
                            }, {
                                name: "myRestParameter",
                                typeExpression: { text: "number[]" },
                                isOptional: true,
                                isRestParameter: true
                            }],
                        returnTypeExpression: { text: "string" }
                    }, {
                        name: "myExplicitReturnTypeMethod",
                        returnTypeExpression: { text: "string" }
                    }, {
                        name: "myImplicitReturnTypeMethod",
                        returnTypeExpression: { text: "string" }
                    }, {
                        name: "myPublicMethod",
                        scope: scope_1.Scope.public
                    }, {
                        name: "myProtectedMethod",
                        scope: scope_1.Scope.protected
                    }, {
                        name: "myPrivateMethod",
                        scope: scope_1.Scope.private
                    }]
            }]
    });
});

//# sourceMappingURL=method-tests.js.map
