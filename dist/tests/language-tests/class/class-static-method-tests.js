var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class static method", function () {
    var code = "\nclass MyClassWithStaticMethods {\n    // parameters\n    static myParameterMethod(myParameter: string, myDefaultParameter = \"some string\", myOptionalParameter?: string, ...myRestParameter: number[]) {\n        return \"\";\n    }\n\n    // return types\n    static myExplicitReturnTypeMethod(): string {\n        return null;\n    }\n\n    static myImplicitReturnTypeMethod() {\n        return \"\";\n    }\n\n    // scope\n    public static myPublicMethod() {\n    }\n\n    protected static myProtectedMethod() {\n    }\n\n    private static myPrivateMethod() {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClassWithStaticMethods",
                staticMethods: [{
                        name: "myParameterMethod",
                        parameters: [{
                                name: "myParameter",
                                typeExpression: { text: "string" }
                            }, {
                                name: "myDefaultParameter",
                                typeExpression: { text: "string" },
                                isOptional: true,
                                defaultExpression: { text: "some string" }
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

//# sourceMappingURL=class-static-method-tests.js.map
