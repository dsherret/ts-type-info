var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface extends class tests", function () {
    var code = "\nclass MyBaseClass {\n    name: string;\n}\n\ninterface MyChildInterface extends MyBaseClass {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyBaseClass",
                properties: [{
                        name: "name",
                        typeExpression: { text: "string" }
                    }]
            }],
        interfaces: [{
                name: "MyChildInterface",
                extends: [{
                        text: "MyBaseClass"
                    }],
                properties: [{
                        name: "name2",
                        typeExpression: { text: "string" }
                    }]
            }]
    });
});

//# sourceMappingURL=extends-class-tests.js.map
