var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface method", function () {
    var code = "\ninterface MyInterface {\n    // parameters\n    myParameterMethod(myParameter: string, myOptionalParameter?: number): number[];\n    myImplicitAnyReturnTypeMethod();\n    myExplicitReturnTypeMethod(): string;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runInterfaceMethodDefinitionTests(def.interfaces[0].methods[0], {
        name: "myParameterMethod",
        returnType: "number[]",
        parameters: [{
                name: "myParameter",
                type: "string"
            }, {
                name: "myOptionalParameter",
                type: "number",
                isRequired: false
            }]
    });
    test_helpers_1.runInterfaceMethodDefinitionTests(def.interfaces[0].methods[1], {
        name: "myImplicitAnyReturnTypeMethod",
        returnType: "any",
        parameters: []
    });
    test_helpers_1.runInterfaceMethodDefinitionTests(def.interfaces[0].methods[2], {
        name: "myExplicitReturnTypeMethod",
        returnType: "string",
        parameters: []
    });
});

//# sourceMappingURL=method-tests.js.map
