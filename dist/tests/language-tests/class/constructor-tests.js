var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class constructor tests", function () {
    var code = "\nclass MyClass1 {\n}\nclass MyClass2 {\n    constructor() {\n    }\n}\nclass MyClass3 {\n    constructor(parameter1: string) {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass1"
            }, {
                name: "MyClass2",
                constructorDef: {}
            }, {
                name: "MyClass3",
                constructorDef: {
                    parameters: [{
                            name: "parameter1",
                            typeExpression: { text: "string" }
                        }]
                }
            }]
    });
});

//# sourceMappingURL=constructor-tests.js.map
