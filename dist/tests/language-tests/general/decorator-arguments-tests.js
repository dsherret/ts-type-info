var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("decorator arguments tests", function () {
    var code = "\nfunction MyClassDecorator(myArg: string) {\n    return (target: Function) => {\n        console.log(target);\n    };\n}\n\n@MyClassDecorator(\"My Value\")\nclass MyClass1 {\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "MyClassDecorator",
                parameters: [{
                        name: "myArg",
                        typeExpression: {
                            text: "string"
                        }
                    }],
                returnTypeExpression: {
                    text: "(target: Function) => void"
                }
            }],
        classes: [{
                name: "MyClass1",
                decorators: [{
                        name: "MyClassDecorator",
                        arguments: [{
                                text: "\"My Value\""
                            }]
                    }]
            }]
    });
});

//# sourceMappingURL=decorator-arguments-tests.js.map
