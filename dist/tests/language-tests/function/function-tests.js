var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function name tests", function () {
    var code = "\nfunction myFunction() {\n}\nfunction myFunctionWithParameters(str: string, optionalParam?: string, defaultParam = new Date(), ...restParam: string[]) {\n    return new Date();\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "myFunction"
            }, {
                name: "myFunctionWithParameters",
                parameters: [{
                        name: "str",
                        typeExpression: { text: "string" }
                    }, {
                        name: "optionalParam",
                        typeExpression: { text: "string" },
                        isOptional: true
                    }, {
                        name: "defaultParam",
                        typeExpression: { text: "Date" },
                        defaultExpression: { text: "new Date()" },
                        isOptional: true
                    }, {
                        name: "restParam",
                        typeExpression: { text: "string[]" },
                        isOptional: true,
                        isRestParameter: true
                    }],
                returnTypeExpression: {
                    text: "Date"
                }
            }]
    });
});

//# sourceMappingURL=function-tests.js.map
