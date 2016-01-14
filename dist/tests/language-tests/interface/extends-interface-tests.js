var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface extends interface tests", function () {
    var code = "\ninterface MyBaseInterface {\n    name: string;\n}\n\ninterface MyChildInterface extends MyBaseInterface {\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyBaseInterface",
                properties: [{
                        name: "name",
                        typeExpression: { text: "string" }
                    }]
            }, {
                name: "MyChildInterface",
                extends: [{
                        text: "MyBaseInterface"
                    }],
                properties: [{
                        name: "name2",
                        typeExpression: { text: "string" }
                    }]
            }]
    });
});

//# sourceMappingURL=extends-interface-tests.js.map
