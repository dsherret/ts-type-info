var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("value module", function () {
    var code = "\ndeclare class MyClass {\n    myMethod(num: number): string;\n}\n\ndeclare module MyClass {\n\tfunction myFunction(str: string): string;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runMethodDefinitionTests(def.classes[0].methods[0], {
        name: "myMethod",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: [{
                name: "num",
                type: "number"
            }]
    });
    test_helpers_1.runStaticMethodDefinitionTests(def.classes[0].staticMethods[0], {
        name: "myFunction",
        scope: scope_1.Scope.public,
        returnType: "string",
        parameters: [{
                name: "str",
                type: "string"
            }]
    });
});

//# sourceMappingURL=value-module-tests.js.map
