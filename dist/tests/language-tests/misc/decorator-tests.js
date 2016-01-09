var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class decorator tests", function () {
    var code = "\nfunction MyClassDecorator(str: string) {\n    return (target: Function) => {\n        console.log(target);\n    };\n}\n\n@MyClassDecorator(\"MyString\")\nclass MyClass {\n}\n";
    var c = main_1.getStringInfo(code).classes[0];
    describe("MyClassDecorator", function () {
        test_helpers_1.runDecoratorDefinitionTests(c.decorators[0], {
            name: "MyClassDecorator",
            arguments: [{
                    text: "MyString"
                }]
        });
    });
});

//# sourceMappingURL=decorator-tests.js.map
