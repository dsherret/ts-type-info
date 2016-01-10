var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function name tests", function () {
    var code = "\nfunction myFunction() {\n}\nfunction myFunctionWithParameters(str: string, num: number, optionalParam?: string, defaultParam = new Date(), ...restParam: string[]) {\n    return new Date();\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFunctionDefinitionTests(def.functions[0], {
        name: "myFunction",
        returnType: "void",
        parameters: []
    });
    test_helpers_1.runFunctionDefinitionTests(def.functions[1], {
        name: "myFunctionWithParameters",
        returnType: "Date",
        parameters: [{
                name: "str",
                type: "string"
            }, {
                name: "num",
                type: "number"
            }, {
                name: "optionalParam",
                type: "string",
                isOptional: true
            }, {
                name: "defaultParam",
                type: "Date",
                isOptional: true,
                defaultExpressionText: "new Date()"
            }, {
                name: "restParam",
                type: "string[]",
                isRestParameter: true,
                isOptional: true
            }]
    });
});

//# sourceMappingURL=function-tests.js.map
