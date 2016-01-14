var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class decorator tests", function () {
    var code = "\nfunction MyClassDecorator(target: Function) {\n    console.log(target);\n}\n\n@MyClassDecorator\nclass MyClass1 {\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "MyClassDecorator",
                parameters: [{
                        name: "target",
                        typeExpression: {
                            text: "Function"
                        }
                    }]
            }],
        classes: [{
                name: "MyClass1",
                decorators: [{
                        name: "MyClassDecorator"
                    }]
            }]
    });
});

//# sourceMappingURL=class-decorator-tests.js.map
