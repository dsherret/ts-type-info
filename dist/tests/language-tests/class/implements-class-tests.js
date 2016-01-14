var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class implements class tests", function () {
    var code = "\nclass MyBaseClass {\n    name1: string;\n}\n\nclass MyClassImplementsClass implements MyBaseClass {\n    name1: string;\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyBaseClass",
                properties: [{
                        name: "name1",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }, {
                name: "MyClassImplementsClass",
                implements: [{ text: "MyBaseClass" }],
                properties: [{
                        name: "name1",
                        typeExpression: {
                            text: "string"
                        }
                    }, {
                        name: "name2",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }]
    });
});

//# sourceMappingURL=implements-class-tests.js.map
