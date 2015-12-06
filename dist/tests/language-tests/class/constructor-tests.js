var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class constructor tests", function () {
    var code = "\nclass MyClass1 {\n}\nclass MyClass2 {\n    constructor() {\n    }\n}\nclass MyClass3 {\n    constructor(parameter1: string) {\n    }\n}";
    var def = main_1.getStringInfo(code);
    describe("class with no constructor", function () {
        test_helpers_1.runConstructorDefinitionTests(def.classes[0].constructorDef, null);
    });
    describe("constructor with no parameters", function () {
        test_helpers_1.runConstructorDefinitionTests(def.classes[1].constructorDef, {
            parameters: []
        });
    });
    describe("constructor with parameters", function () {
        test_helpers_1.runConstructorDefinitionTests(def.classes[2].constructorDef, {
            parameters: [{
                    name: "parameter1",
                    type: "string"
                }]
        });
    });
});

//# sourceMappingURL=constructor-tests.js.map
