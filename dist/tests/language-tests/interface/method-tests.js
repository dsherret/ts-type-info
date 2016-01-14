var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface method", function () {
    var code = "\ninterface MyInterface {\n    // parameters\n    myParameterMethod(myParameter: string, myOptionalParameter?: number): number[];\n    myImplicitAnyReturnTypeMethod();\n    myExplicitReturnTypeMethod(): string;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyInterface",
                methods: [{
                        name: "myParameterMethod",
                        returnTypeExpression: { text: "number[]" },
                        parameters: [{
                                name: "myParameter",
                                typeExpression: { text: "string" }
                            }, {
                                name: "myOptionalParameter",
                                typeExpression: { text: "number" },
                                isOptional: true
                            }]
                    }, {
                        name: "myImplicitAnyReturnTypeMethod",
                        returnTypeExpression: { text: "any" }
                    }, {
                        name: "myExplicitReturnTypeMethod",
                        returnTypeExpression: { text: "string" }
                    }]
            }]
    });
});

//# sourceMappingURL=method-tests.js.map
